import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { endSession } from "../features/auth/authThunks";
import { LogoutView } from "../features/auth/LogoutView";

export function LogoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((root) => root.auth);
  // O 204 limpa o token; mantém a tela até a navegação com o aviso "Você saiu".
  const [leaving, setLeaving] = useState(false);
  if (auth.passwordChangeToken) return <Navigate to="/alterar-senha" replace />;
  if (!auth.accessToken && !leaving) return <Navigate to="/login" replace />;
  return (
    <LogoutView
      logout={async () => {
        setLeaving(true);
        try {
          await dispatch(endSession());
        } catch (error) {
          setLeaving(false);
          throw error;
        }
      }}
      onLoggedOut={() =>
        void navigate("/login", { replace: true, state: { loggedOut: true } })
      }
    />
  );
}
