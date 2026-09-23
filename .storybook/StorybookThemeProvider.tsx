import { ThemeProvider } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";

interface StorybookThemeProviderProps extends PropsWithChildren {
  theme: Theme;
}

export function StorybookThemeProvider({
  children,
  theme,
}: StorybookThemeProviderProps) {
  return (
    <ThemeProvider
      key={theme.defaultColorScheme}
      theme={theme}
      defaultMode={theme.defaultColorScheme}
    >
      {children}
    </ThemeProvider>
  );
}
