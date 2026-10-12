import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Link } from "./Link";

describe("Link", () => {
  it("renderiza um link semântico com destino", () => {
    render(<Link href="/acesso">Voltar ao acesso</Link>);

    expect(
      screen.getByRole("link", { name: "Voltar ao acesso" }),
    ).toHaveAttribute("href", "/acesso");
  });

  it("exibe o ícone externo opcional sem alterar o nome acessível", () => {
    render(
      <Link externalIcon href="https://exemplo.org/termo">
        Visualizar termo
      </Link>,
    );

    const link = screen.getByRole("link", { name: "Visualizar termo" });
    expect(link.querySelector(".material-symbols-outlined")).toHaveTextContent(
      "open_in_new",
    );
  });

  it("impede interação e retira o destino quando desabilitado", () => {
    const onClick = vi.fn();

    render(
      <Link disabled href="/acesso" onClick={onClick}>
        Voltar ao acesso
      </Link>,
    );

    const link = screen.getByRole("link", { name: "Voltar ao acesso" });
    fireEvent.click(link);

    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
    expect(link).not.toHaveAttribute("href");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("executa a ação quando disponível", () => {
    const onClick = vi.fn();

    render(
      <Link href="/ajuda" onClick={onClick}>
        Preciso de ajuda
      </Link>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Preciso de ajuda" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("encaminha a referência e atributos do elemento raiz", () => {
    const ref = createRef<HTMLAnchorElement>();

    render(
      <Link ref={ref} data-testid="link-ajuda" externalIcon href="/ajuda">
        Preciso de ajuda
      </Link>,
    );

    expect(ref.current).toBe(screen.getByTestId("link-ajuda"));
  });
});
