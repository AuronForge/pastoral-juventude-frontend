import { Box, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { AppShell } from "../components/AppShell";

const anonymous = { id: "anonimo", name: "Pessoa autenticada" };

/**
 * Pendência: o Figma pede iniciais configuradas e identificador imutável da
 * pessoa. Até a API fornecê-los, as iniciais vêm do nome e o identificador,
 * das claims `sub` ou `email` do token.
 */
function initialsFrom(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  const letters = [parts[0]?.[0], parts.length > 1 ? parts.at(-1)?.[0] : ""];
  return letters.join("");
}

function authenticatedPerson(accessToken: string | null) {
  if (!accessToken) return anonymous;

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

    const { email, nome, name, sub } = claims as Record<string, unknown>;
    const isText = (claim: unknown): claim is string =>
      typeof claim === "string" && claim.length > 0;
    const displayName = [nome, name, email].find(isText);
    const id = [sub, email].find(isText);

    return {
      id: id ?? anonymous.id,
      name: displayName ?? anonymous.name,
    };
  } catch {
    return anonymous;
  }
}

export function HomePage() {
  const navigate = useNavigate();
  // Pendência: o item "Sair" não está desenhado no App Shell do Figma.
  const navigationItems = [
    { id: "inicio", icon: "home", label: "Início" },
    {
      id: "sair",
      icon: "logout",
      label: "Sair",
      onClick: () => void navigate("/sair"),
    },
  ];
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const person = authenticatedPerson(accessToken);
  const user = { ...person, initials: initialsFrom(person.name) };

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
            <Typography component="p" variant="labelLarge">
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
