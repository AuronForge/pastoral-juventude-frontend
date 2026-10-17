import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "../../app/router";
import {
  authReducer,
  authenticationSucceeded,
  initialAuthState,
  passwordChangeRequired,
} from "./authSlice";
import { systemReducer } from "../system/systemSlice";
import { createAppTheme } from "../../theme/appTheme";
import { apiClient } from "../../shared/api/client";

vi.mock("../../shared/api/client", () => ({ apiClient: { POST: vi.fn() } }));
const post = vi.mocked(apiClient.POST);
function setup(
  path = "/",
  auth: import("./authSlice").AuthState = {
    ...initialAuthState,
    restoration: "complete" as const,
  },
) {
  const store = configureStore({
    reducer: { auth: authReducer, system: systemReducer },
    preloadedState: { auth },
  });
  const router = createMemoryRouter(appRoutes, { initialEntries: [path] });
  render(
    <Provider store={store}>
      <ThemeProvider theme={createAppTheme()}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>,
  );
  return { store, router };
}
afterEach(() => {
  vi.useRealTimers();
  post.mockReset();
});
it("protege a página inicial e acesso direto à troca sem token", async () => {
  const { router } = setup("/alterar-senha");
  await screen.findByRole("heading", { name: "Entrar" });
  expect(router.state.location.pathname).toBe("/login");
});
it("autentica com a API, guarda somente o token normal e protege Login contra retorno", async () => {
  post.mockResolvedValue({
    data: { accessToken: "normal", tokenType: "Bearer", expiresIn: 900 },
    response: new Response(null),
  });
  const { store, router } = setup();
  fireEvent.change(await screen.findByLabelText(/^E-mail/), {
    target: { value: " U@EXEMPLO.TEST " },
  });
  fireEvent.change(screen.getByLabelText(/^Senha/), {
    target: { value: "Senha123!" },
  });
  fireEvent.submit(screen.getByRole("form"));
  await screen.findByRole("heading", { name: "Bem-vindo(a)" });
  expect(store.getState().auth.accessToken).toBe("normal");
  expect(post).toHaveBeenCalledWith(
    "/api/v1/autenticacao/login",
    expect.objectContaining({
      body: { email: "u@exemplo.test", senha: "Senha123!" },
    }),
  );
  await act(() => router.navigate("/login"));
  expect(router.state.location.pathname).toBe("/");
});
it("conclui primeiro acesso, descarta token restrito e exige novo Login", async () => {
  post
    .mockResolvedValueOnce({
      data: {
        tokenTrocaSenha: "restricted",
        tokenType: "TROCA_SENHA",
        expiresIn: 900,
        trocaSenhaObrigatoria: true,
      },
      response: new Response(null),
    })
    .mockResolvedValueOnce({ response: new Response(null, { status: 204 }) });
  const { store, router } = setup("/login");
  fireEvent.change(screen.getByLabelText(/^E-mail/), {
    target: { value: "u@exemplo.test" },
  });
  fireEvent.change(screen.getByLabelText(/^Senha/), {
    target: { value: "Senha123!" },
  });
  fireEvent.submit(screen.getByRole("form"));
  await screen.findByRole("heading", { name: "Defina sua senha" });
  expect(store.getState().auth.accessToken).toBeNull();
  await act(() => router.navigate("/"));
  expect(router.state.location.pathname).toBe("/alterar-senha");
  fireEvent.click(
    await screen.findByRole("button", { name: "Definir minha senha" }),
  );
  fireEvent.change(screen.getByLabelText(/^Nova senha/), {
    target: { value: "NovaSenha123!" },
  });
  fireEvent.change(screen.getByLabelText(/^Confirmar nova senha/), {
    target: { value: "NovaSenha123!" },
  });
  fireEvent.submit(screen.getByRole("form"));
  await screen.findByRole("heading", { name: "Senha definida" });
  fireEvent.click(screen.getByRole("button", { name: "Ir para o login" }));
  await screen.findByText("Senha alterada");
  expect(router.state.location.pathname).toBe("/login");
  expect(store.getState().auth).toEqual({
    ...initialAuthState,
    restoration: "complete",
  });
  expect(post).toHaveBeenLastCalledWith(
    "/api/v1/autenticacao/alterar-senha",
    expect.objectContaining({
      headers: { Authorization: "Bearer restricted" },
    }),
  );
});
it("retorna ao Login ao reiniciar após token rejeitado pela API", async () => {
  const auth = authReducer(
    initialAuthState,
    passwordChangeRequired({ token: "restricted", expiresIn: 900 }),
  );
  post.mockResolvedValue({
    error: {
      status: 401,
      codigo: "TOKEN_EXPIRADO",
      titulo: "Token expirado",
      mensagem: "Expirou",
      endpoint: "/api/v1/autenticacao/alterar-senha",
      timestamp: new Date().toISOString(),
      correlationId: "00000000-0000-4000-8000-000000000001",
    },
    response: new Response(null, { status: 401 }),
  });
  const { store, router } = setup("/login", auth);
  fireEvent.click(
    await screen.findByRole("button", { name: "Definir minha senha" }),
  );
  fireEvent.change(screen.getByLabelText(/^Nova senha/), {
    target: { value: "NovaSenha123!" },
  });
  fireEvent.change(screen.getByLabelText(/^Confirmar nova senha/), {
    target: { value: "NovaSenha123!" },
  });
  fireEvent.submit(screen.getByRole("form"));
  await screen.findByRole("heading", { name: "Valide seu acesso novamente" });
  fireEvent.click(screen.getByRole("link", { name: "Voltar ao login" }));
  await waitFor(() => expect(router.state.location.pathname).toBe("/login"));
  expect(store.getState().auth.passwordChangeToken).toBeNull();
});
it("expira o acesso conforme expiresIn sem renovação automática", async () => {
  vi.useFakeTimers();
  const auth = authReducer(
    initialAuthState,
    authenticationSucceeded({ accessToken: "normal", expiresIn: 1 }),
  );
  const { store, router } = setup("/", auth);
  await act(() => vi.advanceTimersByTimeAsync(1000));
  expect(store.getState().auth.accessToken).toBeNull();
  expect(router.state.location.pathname).toBe("/login");
  expect(
    screen.getByText("Sua sessão expirou. Faça um novo login para continuar."),
  ).toBeVisible();
});
it("sai pelo App Shell, limpa a sessão e mostra o aviso no Login", async () => {
  post.mockResolvedValue({ response: new Response(null, { status: 204 }) });
  const auth = authReducer(
    initialAuthState,
    authenticationSucceeded({ accessToken: "normal", expiresIn: 900 }),
  );
  const { store, router } = setup("/", auth);
  fireEvent.click((await screen.findAllByRole("button", { name: "Sair" }))[0]!);
  await screen.findByRole("heading", { name: "Encerrar acesso" });
  expect(router.state.location.pathname).toBe("/sair");
  fireEvent.click(screen.getByRole("button", { name: "Sair" }));
  await screen.findByText("Seu acesso foi encerrado.");
  expect(router.state.location.pathname).toBe("/login");
  expect(post).toHaveBeenCalledTimes(1);
  expect(post).toHaveBeenCalledWith("/api/v1/autenticacao/logout");
  expect(store.getState().auth).toEqual({
    ...initialAuthState,
    restoration: "complete",
  });
});
it("mantém a sessão quando a saída falha", async () => {
  post.mockResolvedValue({
    error: {
      status: 503,
      codigo: "SERVICO_INDISPONIVEL",
      titulo: "Serviço indisponível",
      mensagem: "Tente novamente.",
      endpoint: "/api/v1/autenticacao/logout",
      timestamp: new Date().toISOString(),
      correlationId: "00000000-0000-4000-8000-000000000001",
    },
    response: new Response(null, { status: 503 }),
  });
  const auth = authReducer(
    initialAuthState,
    authenticationSucceeded({ accessToken: "normal", expiresIn: 900 }),
  );
  const { store, router } = setup("/sair", auth);
  fireEvent.click(await screen.findByRole("button", { name: "Sair" }));
  await screen.findByText("Não foi possível sair");
  expect(router.state.location.pathname).toBe("/sair");
  expect(store.getState().auth.accessToken).toBe("normal");
});
it("protege /sair sem sessão", async () => {
  const { router } = setup("/sair");
  await screen.findByRole("heading", { name: "Entrar" });
  expect(router.state.location.pathname).toBe("/login");
});
