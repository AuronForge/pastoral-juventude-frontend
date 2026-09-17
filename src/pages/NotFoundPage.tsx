import { Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <Container component="main" maxWidth="sm" className="py-5">
      <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
        <Typography variant="overline">Erro 404</Typography>
        <Typography variant="h3" component="h1">
          Página não encontrada
        </Typography>
        <Typography color="text.secondary">
          O endereço informado não existe ou foi movido.
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Voltar ao início
        </Button>
      </Stack>
    </Container>
  );
}
