import { CssBaseline, ThemeProvider } from "@mui/material";
import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { appTheme } from "../theme/appTheme";
import { appStore } from "./store";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={appStore}>
      <ThemeProvider theme={appTheme} defaultMode="light">
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
