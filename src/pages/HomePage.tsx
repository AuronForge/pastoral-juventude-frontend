import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { AppShell } from "../components/AppShell";

const navigationItems = [
  { id: "inicio", icon: <HomeOutlinedIcon />, label: "Início" },
];

function authenticatedPerson(accessToken: string | null) {
  if (!accessToken) {
    return { name: "Pessoa autenticada", role: "Acesso autenticado" };
  }

  try {
    const payload = accessToken.split(".")[1];
    if (!payload) throw new Error("JWT sem payload");

    const normalizedPayload = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const claims: unknown = JSON.parse(window.atob(normalizedPayload));

    if (typeof claims !== "object" || claims === null) {
      throw new Error("Payload JWT inválido");
    }

    const { email, nome, name, role } = claims as Record<string, unknown>;
    const displayName = [nome, name, email].find(
      (claim): claim is string => typeof claim === "string" && claim.length > 0,
    );
    const displayRole = typeof role === "string" && role.length > 0 ? role : null;

    return {
      name: displayName ?? "Pessoa autenticada",
      role: displayRole ?? "Acesso autenticado",
    };
  } catch {
    return { name: "Pessoa autenticada", role: "Acesso autenticado" };
  }
}

export function HomePage() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = authenticatedPerson(accessToken);

  return (
    <AppShell
      activeNavigationId="inicio"
      navigationItems={navigationItems}
      user={user}
    >
      <Box sx={{ display: "flex", minHeight: "100%", alignItems: "center" }}>
        <Paper
          elevation={0}
          sx={{ maxWidth: 640, mx: "auto", p: { xs: 3, sm: 5 }, width: "100%" }}
        >
          <Stack spacing={1.5}>
            <Typography component="p" variant="overline">
              Pastoral da Juventude
            </Typography>
            <Typography component="h1" variant="h4">
              Bem-vindo(a)
            </Typography>
            <Typography color="text.secondary">
              Os módulos da aplicação aparecerão aqui conforme forem
              disponibilizados.
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </AppShell>
  );
}
