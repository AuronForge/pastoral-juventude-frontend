import { keyframes, styled } from "@mui/material/styles";
import { forwardRef } from "react";
import { typographyStyle } from "../../theme/tokens";
import type { ProgressProps } from "./Progress.types";

/** Animação indeterminada do Figma: ciclo de 1,5 s, linear e contínuo. */
const cycle = "1500ms linear infinite";

const slide = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(320%); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LinearRoot = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "var(--layout-fine-10px)",
  width: "100%",
  minHeight: "var(--space-extended-40px)",
  paddingTop: "var(--layout-fine-2px)",
  "& .progress-value": {
    ...typographyStyle("labelSmall"),
    alignSelf: "flex-end",
    color: "var(--pj-color-text-secondary)",
  },
  "& .progress-track": {
    position: "relative",
    overflow: "hidden",
    height: "var(--pj-space-2)",
    borderRadius: "var(--pj-radius-full)",
    backgroundColor: "var(--pj-color-feedback-information-soft)",
  },
  "& .progress-indicator": {
    position: "absolute",
    insetBlock: 0,
    left: 0,
    borderRadius: "var(--pj-radius-full)",
    backgroundColor: "var(--pj-color-action-primary)",
  },
  "& .progress-indicator.indeterminate": {
    /* Segmento de 100 px em uma trilha de 320 px no Figma. */
    width: "31.25%",
    animation: `${slide} ${cycle}`,
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
      left: "28.125%",
    },
  },
});

const CircularRoot = styled("div")({
  position: "relative",
  display: "inline-grid",
  placeItems: "center",
  /* Área de 56 px da variante Circular no Figma (sem variável vinculada). */
  width: 56,
  height: 56,
  "& svg": { position: "absolute", inset: 0, width: "100%", height: "100%" },
  "& .progress-track": {
    fill: "none",
    stroke: "var(--pj-color-feedback-information-soft)",
  },
  "& .progress-indicator": {
    fill: "none",
    stroke: "var(--pj-color-action-primary)",
  },
  "& .indeterminate": {
    transformOrigin: "50% 50%",
    animation: `${spin} ${cycle}`,
    "@media (prefers-reduced-motion: reduce)": { animation: "none" },
  },
  "& .progress-value": {
    ...typographyStyle("labelSmall"),
    color: "var(--pj-color-text-primary)",
  },
});

/** Geometria do Figma: área 56 px, círculo de 48 px e traço de 6 px. */
const BOX = 56;
const RADIUS = 24;
const STROKE = 6;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function clamp(value: number) {
  return Math.min(100, Math.max(0, value));
}

/**
 * Progress do Figma: tipos Linear e Circular, modos Determinado (0 a 100)
 * e Indeterminado.
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    { type = "circular", value, showValue = false, label, ...props },
    ref,
  ) {
    const determinate = value !== undefined;
    const current = determinate ? Math.round(clamp(value)) : undefined;
    const valueText =
      determinate && showValue ? (
        <span className="progress-value" aria-hidden>
          {`${current}%`}
        </span>
      ) : null;
    const a11y = {
      role: "progressbar",
      "aria-label": label,
      ...(determinate && {
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": current,
      }),
    } as const;

    if (type === "linear") {
      return (
        <LinearRoot {...props} {...a11y} ref={ref}>
          {valueText}
          <span className="progress-track">
            <span
              className={`progress-indicator${determinate ? "" : " indeterminate"}`}
              style={determinate ? { width: `${current}%` } : undefined}
            />
          </span>
        </LinearRoot>
      );
    }

    const arc = determinate
      ? (CIRCUMFERENCE * (current ?? 0)) / 100
      : CIRCUMFERENCE / 4;

    return (
      <CircularRoot {...props} {...a11y} ref={ref}>
        <svg viewBox={`0 0 ${BOX} ${BOX}`} aria-hidden focusable="false">
          <circle
            className="progress-track"
            cx={BOX / 2}
            cy={BOX / 2}
            r={RADIUS}
            strokeWidth={STROKE}
          />
          <circle
            className={`progress-indicator${determinate ? "" : " indeterminate"}`}
            cx={BOX / 2}
            cy={BOX / 2}
            r={RADIUS}
            strokeWidth={STROKE}
            strokeDasharray={`${arc} ${CIRCUMFERENCE}`}
          />
        </svg>
        {valueText}
      </CircularRoot>
    );
  },
);
