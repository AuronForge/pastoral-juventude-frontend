import { createBrowserRouter } from "react-router-dom";
import { AuthGate, AuthLifetime } from "../features/auth/AuthGate";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { PasswordRecoveryPage } from "../pages/PasswordRecoveryPage";
import { RequiredPasswordChangePage } from "../pages/RequiredPasswordChangePage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const appRoutes = [
  {
    element: <AuthLifetime />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/recuperar-senha", element: <PasswordRecoveryPage /> },
      { path: "/alterar-senha", element: <RequiredPasswordChangePage /> },
      {
        element: <AuthGate />,
        children: [{ path: "/", element: <HomePage /> }],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];
export const appRouter = createBrowserRouter(appRoutes);
