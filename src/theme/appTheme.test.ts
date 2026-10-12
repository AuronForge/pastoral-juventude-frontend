import { appTheme } from "./appTheme";
import {
  designSystemCssVariables,
  elevationTokens,
  semanticColors,
  typographyTokens,
} from "./tokens";

function channels(color: string, backdrop = "#ffffff"): number[] {
  const rgba = color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/u);
  if (rgba) {
    const background = channels(backdrop);
    const alpha = Number(rgba[4]);
    return rgba.slice(1, 4).map((channel, index) => {
      const foreground = Number(channel) / 255;
      return foreground * alpha + background[index] * (1 - alpha);
    });
  }

  const parsed = color
    .slice(1)
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255);

  if (!parsed || parsed.length < 3) {
    throw new Error(`Cor inválida: ${color}`);
  }

  return parsed;
}

function relativeLuminance(color: string, backdrop?: string) {
  const resolvedChannels = channels(color, backdrop).map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );

  return (
    0.2126 * resolvedChannels[0] +
    0.7152 * resolvedChannels[1] +
    0.0722 * resolvedChannels[2]
  );
}

function contrastRatio(
  foreground: string,
  background: string,
  backdrop?: string,
) {
  const foregroundLuminance = relativeLuminance(foreground, backdrop);
  const backgroundLuminance = relativeLuminance(background, backdrop);
  const lightest = Math.max(foregroundLuminance, backgroundLuminance);
  const darkest = Math.min(foregroundLuminance, backgroundLuminance);

  return (lightest + 0.05) / (darkest + 0.05);
}

describe("design system", () => {
  it("espelha as fundações vigentes do Figma em variáveis CSS", () => {
    expect(designSystemCssVariables.light["--primary-solid"]).toBe("#1f4e5f");
    expect(designSystemCssVariables.light["--bg-canvas"]).toBe("#f7f1e8");
    expect(designSystemCssVariables.light["--bg-surface"]).toBe("#fffdf9");
    expect(designSystemCssVariables.light["--text-primary"]).toBe("#2e2925");
    expect(designSystemCssVariables.light["--radius-md"]).toBe("8px");
    expect(designSystemCssVariables.light["--size-control-lg"]).toBe("48px");
    expect(designSystemCssVariables.light["--size-icon-xl"]).toBe("32px");
    expect(designSystemCssVariables.light["--font-family-display"]).toContain(
      "Roboto",
    );
  });

  it("configura os modos claro e escuro no MUI", () => {
    expect(appTheme.defaultColorScheme).toBe("light");
    expect(appTheme.colorSchemes.light?.palette.primary.main).toBe("#1f4e5f");
    expect(appTheme.colorSchemes.dark?.palette.primary.main).toBe("#1f4e5f");
    expect(appTheme.colorSchemes.light?.palette.secondary.contrastText).toBe(
      "#2e2925",
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
    expect(appTheme.shape.borderRadius).toBe(8);
    expect(appTheme.motion.reducedMotion).toBe("system");
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
        expect(
          contrastRatio(foreground, background, colors.bg.canvas),
        ).toBeGreaterThanOrEqual(4.5);
      }
    },
  );
});
