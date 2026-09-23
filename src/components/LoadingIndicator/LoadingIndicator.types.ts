import type { CircularProgressProps } from "@mui/material";

export type LoadingIndicatorSize = "small" | "medium" | "large";
export type LoadingIndicatorTone = "default" | "on-solid";

type AccessibleLoadingIndicatorProps = {
  decorative?: false;
  label: string;
};

type DecorativeLoadingIndicatorProps = {
  decorative: true;
  label?: never;
};

export type LoadingIndicatorProps = Omit<
  CircularProgressProps,
  | "aria-hidden"
  | "aria-label"
  | "color"
  | "disableShrink"
  | "enableTrackSlot"
  | "max"
  | "min"
  | "role"
  | "size"
  | "thickness"
  | "value"
  | "variant"
> & {
  size?: LoadingIndicatorSize;
  tone?: LoadingIndicatorTone;
} & (AccessibleLoadingIndicatorProps | DecorativeLoadingIndicatorProps);
