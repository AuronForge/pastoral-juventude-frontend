import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: { main: "#5b2c83" },
    secondary: { main: "#f2a900" },
    background: { default: "#f5f2f7" },
  },
  typography: {
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    h3: { fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
});
