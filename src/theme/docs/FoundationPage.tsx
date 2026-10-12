import { Box, Paper, Stack, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";
import { pendingLayoutTokens } from "../tokens";

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
        bgcolor: "var(--pj-color-bg-canvas)",
        color: "var(--pj-color-text-primary)",
        p: { xs: 3, md: 5 },
      }}
    >
      <Stack
        spacing={5}
        sx={{ maxWidth: pendingLayoutTokens.contentMax, mx: "auto" }}
      >
        <Stack spacing={1.5} component="header" sx={{ maxWidth: 760 }}>
          <Typography variant="labelLarge" color="primary.main">
            {eyebrow}
          </Typography>
          <Typography variant="headingLarge" component="h1">
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
      elevation={0}
      sx={{
        border:
          "var(--pj-border-width-default) solid var(--pj-color-border-default)",
        borderRadius: "var(--pj-radius-lg)",
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
            <Typography variant="headingSmall" component="h2">
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
        borderRadius: "var(--pj-radius-sm)",
        bgcolor: "var(--pj-color-bg-canvas)",
        color: "var(--pj-color-text-primary)",
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
