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
  const notice = state?.passwordChanged
    ? "passwordChanged"
    : auth.error?.codigo === "USUARIO_BLOQUEADO"
      ? "blocked"
      : auth.error?.codigo === "USUARIO_INATIVO"
        ? "inactive"
        : auth.error?.codigo === "SESSAO_SUBSTITUIDA"
          ? "replaced"
          : state?.expired || auth.error?.codigo === "SESSAO_EXPIRADA"
            ? "expired"
            : undefined;
  return (
    <LoginView
      recoveryHref="/recuperar-senha"
      notice={notice}
      authenticate={(credentials) => dispatch(authenticate(credentials))}
      onAuthenticated={() => void navigate("/", { replace: true })}
      onPasswordChangeRequired={() =>
        void navigate("/alterar-senha", { replace: true })
      }
    />
  );
}
