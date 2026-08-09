import type { Action } from "../actions/index.js";
import type { Gravity, Margin, Offset, Position } from "./property-types.js";

export type ButtonComponent = {
  type: "button";
  action: Action;
  flex?: number;
  margin?: Margin;
  position?: Position;
  offsetTop?: Offset;
  offsetBottom?: Offset;
  offsetStart?: Offset;
  offsetEnd?: Offset;
  height?: "sm" | "md";
  style?: "primary" | "secondary" | "link";
  color?: string;
  gravity?: Gravity;
  adjustMode?: "shrink-to-fit";
  scaling?: boolean;
};
