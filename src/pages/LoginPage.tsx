import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { authenticate } from "../features/auth/authThunks";
import { LoginView } from "../features/auth/LoginView";

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const auth = useAppSelector((root) => root.auth);
  if (auth.accessToken) return <Navigate to="/" replace />;
  if (auth.passwordChangeToken) return <Navigate to="/alterar-senha" replace />;
  const codigo = auth.error?.codigo;
  const notice = state?.passwordChanged
    ? "passwordChanged"
    : state?.loggedOut
      ? "loggedOut"
      : codigo === "USUARIO_BLOQUEADO"
        ? "blocked"
        : codigo === "USUARIO_INATIVO"
          ? "inactive"
          : codigo === "SESSAO_SUBSTITUIDA" || codigo === "SESSAO_INVALIDA"
            ? "invalidated"
            : state?.expired || codigo === "SESSAO_EXPIRADA"
              ? "expired"
              : undefined;
  return (
    <LoginView
      recoveryHref="/recuperar-senha"
      onRecover={() => void navigate("/recuperar-senha")}
      notice={notice}
      authenticate={(credentials) => dispatch(authenticate(credentials))}
      onAuthenticated={() => void navigate("/", { replace: true })}
      onPasswordChangeRequired={() =>
        void navigate("/alterar-senha", { replace: true })
      }
    />
  );
}
