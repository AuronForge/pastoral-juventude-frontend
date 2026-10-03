import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { PasswordRecoveryView } from "../features/auth/PasswordRecoveryView";
import { recoverPassword } from "../features/auth/authenticationApi";
import { sessionCleared } from "../features/auth/authSlice";

export function PasswordRecoveryPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <PasswordRecoveryView
      recover={async (request) => {
        const result = await recoverPassword(request);
        dispatch(sessionCleared());
        return result;
      }}
      onBack={() => void navigate("/login", { replace: true })}
    />
  );
}
