import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { Box, Chip, Container, Paper, Stack, Typography } from "@mui/material";

const capabilities = ["React + TypeScript", "MUI", "Redux Toolkit", "OpenAPI"];

export function HomePage() {
  return (
    <Box component="main" sx={{ display: "flex", alignItems: "center", py: 5 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "5fr 7fr" },
            }}
          >
            <Box sx={{ bgcolor: "primary.main" }}>
              <Stack
                spacing={2}
                sx={{
                  height: "100%",
                  justifyContent: "center",
                  p: { xs: 4, md: 5 },
                }}
                color="primary.contrastText"
              >
                <Typography variant="overline" component="p">
                  MVP
                </Typography>
                <Typography variant="h3" component="h1">
                  Pastoral da Juventude
                </Typography>
                <Typography variant="body1">
                  Tecnologia a serviço da comunidade, da organização e do
                  cuidado com as pessoas.
                </Typography>
              </Stack>
            </Box>

            <Box sx={{ p: { xs: 4, md: 5 } }}>
              <Stack spacing={3}>
                <CheckCircleOutlinedIcon color="success" fontSize="large" />
                <Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Frontend inicializado
                  </Typography>
                  <Typography color="text.secondary">
                    A base técnica está pronta para receber os módulos de
                    negócio do sistema.
                  </Typography>
                </Box>
                <Stack
                  direction="row"
                  useFlexGap
                  sx={{ flexWrap: "wrap", gap: 1 }}
                >
                  {capabilities.map((capability) => (
                    <Chip
                      key={capability}
                      label={capability}
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
