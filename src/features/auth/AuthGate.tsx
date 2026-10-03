import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { sessionExpired } from "./authSlice";
import { restoreSession } from "./authThunks";
import { Box, Stack } from "@mui/material";
import { Alert, Button, LoadingIndicator } from "../../components";

/** Always mounted across access routes so changing pages cannot extend token lifetime. */
export function AuthLifetime() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, passwordChangeToken, expiresIn, restoration } =
    useAppSelector((root) => root.auth);
  useEffect(() => {
    if (restoration === "pending") void dispatch(restoreSession());
  }, [restoration, dispatch]);
  useEffect(() => {
    if ((!accessToken && !passwordChangeToken) || expiresIn === null) return;
    const timeout = window.setTimeout(() => {
      dispatch(sessionExpired());
      void navigate("/login", { replace: true, state: { expired: true } });
    }, expiresIn * 1000);
    return () => window.clearTimeout(timeout);
  }, [accessToken, passwordChangeToken, expiresIn, dispatch, navigate]);
  if (restoration === "pending" || restoration === "running") {
    return (
      <Box
        component="main"
        sx={{ display: "grid", placeItems: "center", minHeight: "100dvh" }}
      >
        <LoadingIndicator label="Restaurando sua sessão" />
      </Box>
    );
  }
  if (restoration === "failed") {
    return (
      <Box component="main" sx={{ p: 3, maxWidth: 480, mx: "auto" }}>
        <Stack spacing={2}>
          <Alert title="Não foi possível restaurar sua sessão" tone="danger">
            Verifique sua conexão e tente novamente.
          </Alert>
          <Button onClick={() => void dispatch(restoreSession())}>
            Tentar novamente
          </Button>
        </Stack>
      </Box>
    );
  }
  return <Outlet />;
}

export function AuthGate() {
  const auth = useAppSelector((root) => root.auth);
  if (auth.passwordChangeToken) return <Navigate to="/alterar-senha" replace />;
  return auth.accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}
