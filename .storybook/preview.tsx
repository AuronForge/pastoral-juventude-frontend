import "@fontsource/figtree/latin-400.css";
import "@fontsource/figtree/latin-500.css";
import "@fontsource/figtree/latin-600.css";
import "@fontsource/figtree/latin-700.css";
import "@fontsource/fraunces/latin-600.css";
import { CssBaseline } from "@mui/material";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import "../src/styles/global.css";
import { createAppTheme } from "../src/theme/appTheme";
import { pastoralStorybookTheme } from "./pastoralTheme";
import { StorybookThemeProvider } from "./StorybookThemeProvider";

const themes = {
  Claro: createAppTheme("light"),
  Escuro: createAppTheme("dark"),
};

const preview: Preview = {
  decorators: [
    withThemeFromJSXProvider({
      themes,
      defaultTheme: "Claro",
      Provider: StorybookThemeProvider,
      GlobalStyles: CssBaseline,
    }),
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
