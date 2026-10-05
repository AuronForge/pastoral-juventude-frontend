import { StrictMode } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "../../app/router";
import { authReducer, initialAuthState, sessionCleared } from "./authSlice";
import { systemReducer } from "../system/systemSlice";
import { createAppTheme } from "../../theme/appTheme";
import { apiClient } from "../../shared/api/client";
import { restoreSession } from "./authThunks";

vi.mock("../../shared/api/client", () => ({ apiClient: { POST: vi.fn() } }));
const post = vi.mocked(apiClient.POST);
const problem = {
  status: 401,
  codigo: "SESSAO_INVALIDA",
  titulo: "Sessão inválida",
  mensagem: "Entre novamente",
  endpoint: "/api/v1/autenticacao/renovar-token",
  timestamp: new Date().toISOString(),
  correlationId: "00000000-0000-4000-8000-000000000001",
};
function setup(path = "/") {
  const store = configureStore({
    reducer: { auth: authReducer, system: systemReducer },
  });
  const router = createMemoryRouter(appRoutes, { initialEntries: [path] });
  render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={createAppTheme("light")}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </StrictMode>,
  );
  return { store, router };
}
afterEach(() => post.mockReset());
it("aguarda refresh, evita redirecionamento prematuro e deduplica StrictMode", async () => {
  let release!: (value: unknown) => void;
  post.mockImplementation(
    () =>
      new Promise((resolve) => {
        release = resolve;
      }) as ReturnType<typeof apiClient.POST>,
  );
  const { store, router } = setup();
  expect(
    screen.getByRole("progressbar", { name: "Restaurando sua sessão" }),
  ).toBeVisible();
  expect(
    screen.queryByRole("heading", { name: "Entrar" }),
  ).not.toBeInTheDocument();
  expect(router.state.location.pathname).toBe("/");
  expect(post).toHaveBeenCalledTimes(1);
  await act(async () =>
    release({
      data: { accessToken: "renewed", tokenType: "Bearer", expiresIn: 75 },
      response: new Response(null),
    }),
  );
  await screen.findByRole("heading", { name: "Bem-vindo(a)" });
  expect(store.getState().auth).toMatchObject({
    accessToken: "renewed",
    expiresIn: 75,
    restoration: "complete",
  });
  expect(post).toHaveBeenCalledWith("/api/v1/autenticacao/renovar-token");
  await store.dispatch(restoreSession());
  expect(post).toHaveBeenCalledTimes(1);
  expect(localStorage.length + sessionStorage.length).toBe(0);
});
it.each(["/", "/alterar-senha"])(
  "cookie inválido deixa %s anônimo sem erro de login",
  async (path) => {
    post.mockResolvedValue({
      error: problem,
      response: new Response(null, { status: 401 }),
    });
    const { store, router } = setup(path);
    await screen.findByRole("heading", { name: "Entrar" });
    expect(router.state.location.pathname).toBe("/login");
    expect(store.getState().auth).toEqual({
      ...initialAuthState,
      restoration: "complete",
      error: problem,
    });
  },
);
it.each(["network", "empty", 503, 403] as const)(
  "falha %s permite repetir sem perder o cookie",
  async (failure) => {
    if (failure === "network")
      post.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    else if (failure === "empty")
      post.mockResolvedValueOnce({ response: new Response(null) });
    else
      post.mockResolvedValueOnce({
        error: { ...problem, status: failure },
        response: new Response(null, { status: failure }),
      });
    post.mockResolvedValueOnce({
      data: { accessToken: "renewed", tokenType: "Bearer", expiresIn: 900 },
      response: new Response(null),
    });
    const { store, router } = setup();
    await screen.findByText("Não foi possível restaurar sua sessão");
    expect(router.state.location.pathname).toBe("/");
    expect(store.getState().auth.restoration).toBe("failed");
    fireEvent.click(screen.getByRole("button", { name: "Tentar novamente" }));
    await screen.findByRole("heading", { name: "Bem-vindo(a)" });
    expect(post).toHaveBeenCalledTimes(2);
  },
);
it("ignora refresh tardio após limpeza da sessão", async () => {
  let release!: (value: unknown) => void;
  post.mockImplementation(
    () =>
      new Promise((resolve) => {
        release = resolve;
      }) as ReturnType<typeof apiClient.POST>,
  );
  const { store } = setup();
  await act(async () => {
    store.dispatch(sessionCleared());
    release({
      data: { accessToken: "late", tokenType: "Bearer", expiresIn: 900 },
      response: new Response(null),
    });
  });
  expect(store.getState().auth.accessToken).toBeNull();
});
it("ignora falha tardia após limpeza da sessão", async () => {
  let reject!: (error: Error) => void;
  post.mockImplementation(
    () =>
      new Promise((_, fail) => {
        reject = fail;
      }) as ReturnType<typeof apiClient.POST>,
  );
  const { store } = setup();
  await act(async () => {
    store.dispatch(sessionCleared());
    reject(new Error("network"));
  });
  expect(store.getState().auth.restoration).toBe("complete");
});

it.each([
  [400, "TOKEN_REFRESH_AUSENTE", "Entrar"],
  [409, "SESSAO_SUBSTITUIDA", "Sessão substituída"],
  [403, "USUARIO_BLOQUEADO", "Usuário bloqueado"],
  [403, "USUARIO_INATIVO", "Usuário inativo"],
  [401, "SESSAO_EXPIRADA", "Tempo esgotado"],
] as const)("trata erro terminal %s/%s", async (status, codigo, title) => {
  post.mockResolvedValue({
    error: { ...problem, status, codigo },
    response: new Response(null, { status }),
  });
  const { router } = setup();
  if (title === "Entrar") await screen.findByRole("heading", { name: title });
  else await screen.findByText(title);
  expect(router.state.location.pathname).toBe("/login");
});
