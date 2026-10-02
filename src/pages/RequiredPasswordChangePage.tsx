import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { completeRequiredPasswordChange } from "../features/auth/authThunks";
import { sessionCleared } from "../features/auth/authSlice";
import { PasswordChangeView } from "../features/auth/PasswordChangeView";

export function RequiredPasswordChangePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((root) => root.auth);
  if (!auth.passwordChangeToken) return <Navigate to="/login" replace />;
  return (
    <PasswordChangeView
      change={(request) => dispatch(completeRequiredPasswordChange(request))}
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
