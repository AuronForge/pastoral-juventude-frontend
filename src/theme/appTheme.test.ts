import { appTheme } from "./appTheme";
import {
  designSystemCssVariables,
  elevationTokens,
  geometryTokens,
  iconTokens,
  layoutTokens,
  primitiveColorTokens,
  resolveColor,
  semanticColorTokens,
  spacingTokens,
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
  it("publica as variáveis do Figma com o code syntax definido", () => {
    const expected =
      primitiveColorTokens.length +
      semanticColorTokens.length +
      spacingTokens.length +
      geometryTokens.length +
      iconTokens.length +
      layoutTokens.length;

    expect(Object.keys(designSystemCssVariables)).toHaveLength(expected);
    expect(designSystemCssVariables["--pj-color-blue-600"]).toBe("#1f4e5f");
    expect(designSystemCssVariables["--pj-color-action-primary"]).toBe(
      "var(--pj-color-blue-600)",
    );
    expect(designSystemCssVariables["--color-tooltip-text"]).toBe(
      "var(--pj-color-text-inverse)",
    );
    expect(designSystemCssVariables["--pj-space-4"]).toBe("16px");
    expect(designSystemCssVariables["--pj-radius-md"]).toBe("8px");
    expect(designSystemCssVariables["--pj-layout-sidebar-expanded"]).toBe(
      "280px",
    );
  });

  it("resolve os aliases semânticos até o primitivo", () => {
    expect(resolveColor("color/action/primary")).toBe("#1f4e5f");
    expect(resolveColor("color/tooltip/text")).toBe("#fffdf9");
    expect(resolveColor("color/feedback/attention-soft")).toBe(
      "rgba(244, 180, 0, 0.12)",
    );
  });

  it("configura somente o modo claro no MUI", () => {
    expect(appTheme.palette.mode).toBe("light");
    expect(appTheme.colorSchemes.dark).toBeUndefined();
    expect(appTheme.palette.primary.main).toBe("#1f4e5f");
    expect(appTheme.palette.error.main).toBe("#b3261e");
    expect(appTheme.palette.background.default).toBe("#f7f1e8");
  });

  it("configura Roboto, os 11 estilos, raio e elevações do Figma", () => {
    expect(appTheme.typography.fontFamily).toContain("Roboto");
    expect(Object.keys(typographyTokens)).toHaveLength(11);
    expect(appTheme.typography.labelMedium).toMatchObject({
      fontSize: 12,
      lineHeight: "16px",
      fontWeight: 500,
    });
    expect(appTheme.typography.display).toMatchObject({
      fontSize: 40,
      lineHeight: "48px",
      fontWeight: 700,
    });
    expect(appTheme.shape.borderRadius).toBe(8);
    expect(appTheme.shadows[1]).toBe(elevationTokens.small);
    expect(appTheme.shadows[2]).toBe(elevationTokens.medium);
    expect(appTheme.shadows[3]).toBe(elevationTokens.large);
    expect(appTheme.shadows[24]).toBe(elevationTokens.large);
  });

  it("mantém contraste AA nas combinações textuais usadas pelos componentes do Figma", () => {
    const pairs = [
      ["color/text/primary", "color/bg/canvas"],
      ["color/text/secondary", "color/bg/canvas"],
      ["color/text/secondary", "color/bg/surface"],
      ["color/action/primary", "color/bg/surface"],
      ["color/text/inverse", "color/action/primary"],
      ["color/text/inverse", "color/action/primary-hover"],
      ["color/text/inverse", "color/action/danger"],
      ["color/text/inverse", "color/action/danger-hover"],
      ["color/text/danger", "color/bg/surface"],
      ["color/feedback/success", "color/bg/surface"],
      ["color/feedback/attention", "color/bg/surface"],
      ["color/text/inverse", "color/bg/access"],
    ] as const;

    for (const [foreground, background] of pairs) {
      expect(
        contrastRatio(resolveColor(foreground), resolveColor(background)),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});
