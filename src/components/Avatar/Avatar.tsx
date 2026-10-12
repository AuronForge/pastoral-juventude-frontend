import { styled } from "@mui/material";
import { forwardRef } from "react";
import { typographyStyle } from "../../theme/tokens";
import type { AvatarColor, AvatarProps, AvatarSize } from "./Avatar.types";
import { avatarColor, normalizeInitials } from "./avatarUtils";

const sizeToken = {
  32: "var(--pj-avatar-size-sm)",
  40: "var(--pj-avatar-size-md)",
  48: "var(--pj-avatar-size-lg)",
} as const;

type OwnerState = { avatarSize: AvatarSize; avatarColor: AvatarColor };

const Root = styled("span", {
  shouldForwardProp: (prop) => prop !== "avatarSize" && prop !== "avatarColor",
})<OwnerState>(({ avatarSize, avatarColor }) => ({
  ...typographyStyle(avatarSize === 32 ? "labelMedium" : "labelLarge"),
  display: "inline-grid",
  placeItems: "center",
  flexShrink: 0,
  width: sizeToken[avatarSize],
  height: sizeToken[avatarSize],
  borderRadius: "var(--pj-radius-full)",
  backgroundColor: `var(--pj-color-avatar-${avatarColor}-bg)`,
  color: `var(--pj-color-avatar-${avatarColor}-fg)`,
  userSelect: "none",
}));

/**
 * Avatar do Figma: identifica pessoas exclusivamente por iniciais, com cor
 * derivada de forma estável do identificador da pessoa.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { initials, personId, size = 40, label, ...props },
  ref,
) {
  return (
    <Root
      {...props}
      ref={ref}
      avatarColor={avatarColor(personId)}
      avatarSize={size}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    >
      {normalizeInitials(initials)}
    </Root>
  );
});
