import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { Box, Chip, Container, Paper, Stack, Typography } from "@mui/material";

const capabilities = ["React + TypeScript", "MUI", "Redux Toolkit", "OpenAPI"];

export function HomePage() {
  return (
    <Box component="main" className="d-flex align-items-center py-5">
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ overflow: "hidden" }}>
          <Box className="row g-0">
            <Box className="col-12 col-lg-5" sx={{ bgcolor: "primary.main" }}>
              <Stack
                spacing={2}
                className="h-100 justify-content-center p-4 p-md-5"
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

            <Box className="col-12 col-lg-7 p-4 p-md-5">
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
