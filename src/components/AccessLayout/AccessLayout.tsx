import { BrandLockup } from "../BrandLockup";
import { Message, Root, Surface } from "./AccessLayout.styles";
import type { AccessLayoutProps } from "./AccessLayout.types";

const DEFAULT_HELP =
  "Problemas para entrar? Fale com o coordenador da sua pastoral.";

/**
 * Access Layout do Figma: superfície de acesso com a assinatura da marca, o
 * conteúdo da jornada e a ajuda; no desktop, a mensagem institucional ao lado.
 */
export function AccessLayout({
  children,
  help = DEFAULT_HELP,
  ...props
}: AccessLayoutProps) {
  return (
    <Root {...props}>
      <Surface>
        <BrandLockup tone="on-light" style={{ alignSelf: "flex-start" }} />
        <div className="access-content">{children}</div>
        {help ? <p className="access-help">{help}</p> : null}
      </Surface>
      <Message aria-label="Sobre a Pastoral da Juventude">
        <p className="access-context">Pastoral da Juventude</p>
        <figure>
          <blockquote>
            “Porque onde dois ou três estiverem reunidos em meu nome, ali estou
            eu no meio deles.”
          </blockquote>
          <figcaption>
            <cite>Mt 18,20</cite>
          </figcaption>
        </figure>
        <ul>
          <li>Encontros, presença e pendências no mesmo lugar</li>
          <li>Cada pessoa da pastoral com a sua história</li>
          <li>Lideranças acompanhadas, não improvisadas</li>
        </ul>
      </Message>
    </Root>
  );
}
