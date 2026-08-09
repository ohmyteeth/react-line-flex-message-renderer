import type {
  FontStyle,
  FontWeight,
  IconSize,
  TextDecoration,
} from "./property-types.js";

export type SpanComponent = {
  type: "span";
  text?: string;
  color?: string;
  size?: IconSize;
  weight?: FontWeight;
  style?: FontStyle;
  decoration?: TextDecoration;
};
