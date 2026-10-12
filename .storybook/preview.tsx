import { CssBaseline, ThemeProvider } from "@mui/material";
import type { Preview } from "@storybook/react-vite";
import "../src/styles/global.css";
import { appTheme } from "../src/theme/appTheme";
import { pastoralStorybookTheme } from "./pastoralTheme";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: "error" },
    docs: { theme: pastoralStorybookTheme },
    options: {
      storySort: {
        order: [
          "Design System",
          [
            "Introdução",
            "Fundações",
            ["Cores", "Tipografia", "Layout", "Elevação"],
            "Componentes",
          ],
        ],
      },
    },
  },
};

export default preview;
