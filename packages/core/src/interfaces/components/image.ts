import type { Action } from "../actions/index.js";
import type {
  AspectMode,
  Gravity,
  ImageSize,
  Margin,
  Offset,
  Position,
  TextHorizontalAlign,
} from "./property-types.js";

export type ImageComponent = {
  type: "image";
  url: string;
  flex?: number;
  margin?: Margin;
  position?: Position;
  offsetTop?: Offset;
  offsetBottom?: Offset;
  offsetStart?: Offset;
  offsetEnd?: Offset;
  align?: TextHorizontalAlign;
  gravity?: Gravity;
  size?: ImageSize;
  aspectRatio?: `${number}:${number}`;
  aspectMode?: AspectMode;
  backgroundColor?: string;
  action?: Action;
  animated?: boolean;
};
