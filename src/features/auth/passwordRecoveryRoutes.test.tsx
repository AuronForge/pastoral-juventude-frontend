import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "../../app/router";
import { authReducer, initialAuthState } from "./authSlice";
import { systemReducer } from "../system/systemSlice";
import { createAppTheme } from "../../theme/appTheme";
import { apiClient } from "../../shared/api/client";
vi.mock("../../shared/api/client", () => ({ apiClient: { POST: vi.fn() } }));
it("recuperação é pública, limpa estado sem guardar segredo e volta ao login", async () => {
  const post = vi.mocked(apiClient.POST);
  const temporary = "fictional-response";
  post.mockResolvedValue({
    data: {
      senhaTemporaria: temporary,
      expiraEm: new Date(Date.now() + 900000).toISOString(),
      trocaSenhaObrigatoria: true,
    },
    response: new Response(null),
  });
  const store = configureStore({
    reducer: { auth: authReducer, system: systemReducer },
    preloadedState: {
      auth: { ...initialAuthState, restoration: "complete" as const },
    },
  });
  const router = createMemoryRouter(appRoutes, {
    initialEntries: ["/recuperar-senha"],
  });
  render(
    <Provider store={store}>
      <ThemeProvider theme={createAppTheme("light")}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>,
  );
  for (const [label, value] of [
    [/^Nome completo/, "Maria"],
    [/^E-mail/, "maria@exemplo.test"],
    [/^Data de nascimento/, "01/01/2000"],
    [/^Paróquia/, "São João"],
  ] as const)
    fireEvent.change(await screen.findByLabelText(label), {
      target: { value },
    });
  fireEvent.submit(screen.getByRole("form"));
  await screen.findByRole("heading", { name: "Sua senha temporária" });
  expect(JSON.stringify(store.getState())).not.toContain(temporary);
  expect(store.getState().auth.accessToken).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Voltar para entrar" }));
  await screen.findByRole("heading", { name: "Entrar" });
  expect(screen.queryByText(temporary)).not.toBeInTheDocument();
  await waitFor(() => expect(router.state.location.pathname).toBe("/login"));
  expect(
    screen.getByRole("link", { name: "Esqueci minha senha" }),
  ).toHaveAttribute("href", "/recuperar-senha");
  post.mockReset();
});
