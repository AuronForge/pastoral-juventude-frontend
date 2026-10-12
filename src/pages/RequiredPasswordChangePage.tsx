import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { completeRequiredPasswordChange } from "../features/auth/authThunks";
import { sessionCleared } from "../features/auth/authSlice";
import { PasswordChangeView } from "../features/auth/PasswordChangeView";

export function RequiredPasswordChangePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((root) => root.auth);
  // A troca concluída limpa o token; mantém a tela "Senha definida" até o clique.
  const [completing, setCompleting] = useState(false);
  if (!auth.passwordChangeToken && !completing)
    return <Navigate to="/login" replace />;
  return (
    <PasswordChangeView
      change={async (request) => {
        setCompleting(true);
        try {
          await dispatch(completeRequiredPasswordChange(request));
        } catch (error) {
          setCompleting(false);
          throw error;
        }
      }}
      onCompleted={() =>
        void navigate("/login", {
          replace: true,
          state: { passwordChanged: true },
        })
      }
      onRestart={() => {
        dispatch(sessionCleared());
        void navigate("/login", { replace: true, state: { expired: true } });
      }}
    />
  );
}
