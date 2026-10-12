import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";
import { avatarColor, normalizeInitials } from "./avatarUtils";

describe("Avatar", () => {
  it("é decorativo por padrão", () => {
    const { container } = render(<Avatar initials="ms" personId="p-1" />);

    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    expect(container.firstChild).toHaveTextContent("MS");
  });

  it("anuncia o nome completo quando isolado", () => {
    render(<Avatar initials="MS" label="Maria da Silva" personId="p-1" />);

    expect(
      screen.getByRole("img", { name: "Maria da Silva" }),
    ).toBeInTheDocument();
  });

  it("deriva sempre a mesma cor do identificador", () => {
    expect(avatarColor("pessoa-42")).toBe(avatarColor("pessoa-42"));
    expect(["blue", "terracotta", "gold", "neutral"]).toContain(
      avatarColor("pessoa-42"),
    );
  });

  it("normaliza as iniciais sem gerar letras", () => {
    expect(normalizeInitials("  jé  ")).toBe("JÉ");
    expect(normalizeInitials("abc")).toBe("AB");
  });

  it.each([
    [32, "var(--pj-avatar-size-sm)"],
    [40, "var(--pj-avatar-size-md)"],
    [48, "var(--pj-avatar-size-lg)"],
  ] as const)("usa o tamanho %s do Figma", (size, token) => {
    const { container } = render(
      <Avatar initials="MS" personId="p-1" size={size} />,
    );

    expect(container.firstChild).toHaveStyle({ width: token, height: token });
  });
});
