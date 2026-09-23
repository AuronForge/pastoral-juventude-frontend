import { appTheme } from "./appTheme";
import {
  designSystemCssVariables,
  elevationTokens,
  semanticColors,
  typographyTokens,
} from "./tokens";

function relativeLuminance(hex: string) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );

  if (!channels || channels.length < 3) {
    throw new Error(`Cor hexadecimal inválida: ${hex}`);
  }

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foreground: string, background: string) {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lightest = Math.max(foregroundLuminance, backgroundLuminance);
  const darkest = Math.min(foregroundLuminance, backgroundLuminance);

  return (lightest + 0.05) / (darkest + 0.05);
}

describe("design system", () => {
  it("espelha os 179 tokens do Figma em variáveis CSS", () => {
    expect(Object.keys(designSystemCssVariables.light)).toHaveLength(179);
    expect(Object.keys(designSystemCssVariables.dark)).toHaveLength(179);
    expect(designSystemCssVariables.light["--primary-solid"]).toBe("#274c77");
    expect(designSystemCssVariables.dark["--primary-solid"]).toBe("#3a6394");
    expect(designSystemCssVariables.light["--font-family-display"]).toContain(
      "Fraunces",
    );
  });

  it("configura os modos claro e escuro no MUI", () => {
    expect(appTheme.defaultColorScheme).toBe("light");
    expect(appTheme.colorSchemes.light?.palette.primary.main).toBe("#274c77");
    expect(appTheme.colorSchemes.dark?.palette.primary.main).toBe("#3a6394");
    expect(appTheme.colorSchemes.light?.palette.secondary.contrastText).toBe(
      "#2b2724",
    );
  });

  it("configura tipografia, breakpoints, raios e elevações do Figma", () => {
    expect(appTheme.breakpoints.values).toEqual({
      xs: 0,
      sm: 360,
      md: 768,
      lg: 1200,
      xl: 1440,
    });
    expect(appTheme.shape.borderRadius).toBe(12);
    expect(appTheme.typography.displayMedium).toEqual(
      typographyTokens.displayMedium,
    );
    expect(appTheme.shadows[2]).toBe(elevationTokens.card);
    expect(appTheme.shadows[4]).toBe(elevationTokens.modal);
  });

  it.each(Object.entries(semanticColors))(
    "mantém contraste AA nas combinações textuais críticas do modo %s",
    (_mode, colors) => {
      const pairs = [
        [colors.text.primary, colors.bg.canvas],
        [colors.text.secondary, colors.bg.canvas],
        [colors.text.placeholder, colors.bg.surface],
        [colors.text.link, colors.bg.canvas],
        [colors.text.onPrimary, colors.primary.solid],
        [colors.accent.text, colors.accent.subtle],
        [colors.status.success.text, colors.status.success.subtle],
        [colors.status.warning.text, colors.status.warning.subtle],
        [colors.status.danger.text, colors.status.danger.subtle],
        [colors.status.neutral.text, colors.status.neutral.subtle],
        [colors.status.info.text, colors.status.info.subtle],
        [colors.status.success.onSolid, colors.status.success.solid],
        [colors.status.warning.onSolid, colors.status.warning.solid],
        [colors.status.danger.onSolid, colors.status.danger.solid],
        [colors.status.neutral.onSolid, colors.status.neutral.solid],
        [colors.status.info.onSolid, colors.status.info.solid],
        [colors.sidebar.text, colors.sidebar.bg],
        [colors.sidebar.textMuted, colors.sidebar.bg],
        [colors.sidebar.textActive, colors.sidebar.itemActiveBg],
      ] as const;

      for (const [foreground, background] of pairs) {
        expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(
          4.5,
        );
      }
    },
  );
});
