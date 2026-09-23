import { Box, Paper, Stack, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

interface FoundationPageProps extends PropsWithChildren {
  description: string;
  eyebrow?: string;
  title: string;
}

export function FoundationPage({
  children,
  description,
  eyebrow = "Design System",
  title,
}: FoundationPageProps) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        bgcolor: "var(--bg-canvas)",
        color: "var(--text-primary)",
        p: { xs: 3, md: 5 },
      }}
    >
      <Stack
        spacing={5}
        sx={{ maxWidth: "var(--size-content-max)", mx: "auto" }}
      >
        <Stack spacing={1.5} component="header" sx={{ maxWidth: 760 }}>
          <Typography variant="overline" color="primary.main">
            {eyebrow}
          </Typography>
          <Typography variant="displayLarge" component="h1">
            {title}
          </Typography>
          <Typography variant="bodyLarge" color="text.secondary">
            {description}
          </Typography>
        </Stack>
        {children}
      </Stack>
    </Box>
  );
}

interface FoundationSectionProps extends PropsWithChildren {
  description?: string;
  title: string;
  trailing?: ReactNode;
}

export function FoundationSection({
  children,
  description,
  title,
  trailing,
}: FoundationSectionProps) {
  return (
    <Paper
      component="section"
      elevation={2}
      sx={{
        border: "var(--border-thin) solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        p: { xs: 3, md: 4 },
      }}
    >
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
          }}
        >
          <Box>
            <Typography variant="headingLarge" component="h2">
              {title}
            </Typography>
            {description ? (
              <Typography
                variant="bodyMedium"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {description}
              </Typography>
            ) : null}
          </Box>
          {trailing}
        </Stack>
        {children}
      </Stack>
    </Paper>
  );
}

export function TokenCode({ children }: PropsWithChildren) {
  return (
    <Box
      component="code"
      sx={{
        display: "inline-block",
        borderRadius: "var(--radius-xs)",
        bgcolor: "var(--bg-surface-sunken)",
        color: "var(--text-primary)",
        fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
        fontSize: 12,
        lineHeight: "16px",
        px: 0.75,
        py: 0.25,
      }}
    >
      {children}
    </Box>
  );
}
