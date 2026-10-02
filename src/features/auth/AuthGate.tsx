import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { sessionExpired } from "./authSlice";

/** Always mounted across access routes so changing pages cannot extend token lifetime. */
export function AuthLifetime() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, passwordChangeToken, expiresIn } = useAppSelector(
    (root) => root.auth,
  );
  useEffect(() => {
    if ((!accessToken && !passwordChangeToken) || expiresIn === null) return;
    const timeout = window.setTimeout(() => {
      dispatch(sessionExpired());
      void navigate("/login", { replace: true, state: { expired: true } });
    }, expiresIn * 1000);
    return () => window.clearTimeout(timeout);
  }, [accessToken, passwordChangeToken, expiresIn, dispatch, navigate]);
  return <Outlet />;
}

export function AuthGate() {
  const auth = useAppSelector((root) => root.auth);
  if (auth.passwordChangeToken) return <Navigate to="/alterar-senha" replace />;
  return auth.accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}
