import type { AvatarColor } from "./Avatar.types";

const colorOrder: AvatarColor[] = ["blue", "terracotta", "gold", "neutral"];

/** Hash estável do identificador da pessoa (sempre a mesma cor). */
export function avatarColor(personId: string): AvatarColor {
  let hash = 0;
  for (const character of personId) {
    hash = (hash * 31 + (character.codePointAt(0) ?? 0)) >>> 0;
  }
  return colorOrder[hash % colorOrder.length];
}

/** Normaliza as iniciais: sem espaços externos, maiúsculas, até 2 caracteres. */
export function normalizeInitials(initials: string) {
  return Array.from(initials.trim().toUpperCase()).slice(0, 2).join("");
}
