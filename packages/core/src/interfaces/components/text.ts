import type { Action } from "../actions/index.js";
import type {
  FontStyle,
  FontWeight,
  Gravity,
  IconSize,
  LineSpacing,
  Margin,
  Offset,
  Position,
  TextDecoration,
  TextHorizontalAlign,
} from "./property-types.js";
import type { SpanComponent } from "./span.js";

export type TextComponent = {
  type: "text";
  text?: string;
  contents: SpanComponent[];
  adjustMode?: "shrink-to-fit";
  flex?: number;
  margin?: Margin;
  position?: Position;
  offsetTop?: Offset;
  offsetBottom?: Offset;
  offsetStart?: Offset;
  offsetEnd?: Offset;
  size?: IconSize;
  scaling?: boolean;
  align?: TextHorizontalAlign;
  gravity?: Gravity;
  wrap?: boolean;
  lineSpacing?: LineSpacing;
  maxLines?: number;
  weight?: FontWeight;
  color?: string;
  action?: Action;
  style?: FontStyle;
  decoration?: TextDecoration;
};
