import { create } from "storybook/theming";
import { fontFamily, resolveColor, tokenValue } from "../src/theme/tokens";

export const pastoralStorybookTheme = create({
  base: "light",
  brandTitle: "Pastoral da Juventude · Design System",
  brandUrl: "/",
  colorPrimary: resolveColor("color/action/primary"),
  colorSecondary: resolveColor("color/action/accent"),
  appBg: resolveColor("color/bg/canvas"),
  appContentBg: resolveColor("color/bg/surface"),
  appBorderColor: resolveColor("color/border/default"),
  appBorderRadius: tokenValue("radius/md"),
  textColor: resolveColor("color/text/primary"),
  textMutedColor: resolveColor("color/text/secondary"),
  barTextColor: resolveColor("color/text/secondary"),
  barSelectedColor: resolveColor("color/action/primary"),
  barHoverColor: resolveColor("color/action/primary-hover"),
  inputBg: resolveColor("color/bg/surface"),
  inputBorder: resolveColor("color/border/default"),
  inputTextColor: resolveColor("color/text/primary"),
  inputBorderRadius: tokenValue("radius/md"),
  fontBase: fontFamily,
  fontCode: "ui-monospace, SFMono-Regular, Consolas, monospace",
});
