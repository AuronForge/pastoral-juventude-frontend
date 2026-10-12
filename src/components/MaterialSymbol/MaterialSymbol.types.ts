import type { HTMLAttributes } from "react";
import type { MaterialSymbolName } from "./symbolAssets";

export type MaterialSymbolSize = "small" | "medium" | "large" | "xlarge";

export interface MaterialSymbolProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  /** Nome oficial do Material Symbol, como home ou calendar_month. */
  name: MaterialSymbolName;
  /** Nome acessível quando o símbolo comunica informação sem outro rótulo. */
  label?: string;
  /** Tamanho da escala oficial ou valor numérico em pixels. */
  size?: MaterialSymbolSize | number;
}
