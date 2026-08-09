import type { Action } from "../actions/index.js";
import type { ButtonComponent } from "./button.js";
import type { FillerComponent } from "./filler.js";
import type { IconComponent } from "./icon.js";
import type { ImageComponent } from "./image.js";
import type {
  AlignItems,
  BorderWidth,
  CornerRadius,
  JustifyContent,
  Margin,
  Offset,
  Padding,
  Position,
  Spacing,
} from "./property-types.js";
import type { SeparatorComponent } from "./separator.js";
import type { TextComponent } from "./text.js";

export interface BoxComponentBase {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: BorderWidth;
  cornerRadius?: CornerRadius;
  width?: `${number}px` | `${number}%`;
  maxWidth?: `${number}px` | `${number}%`;
  height?: `${number}px` | `${number}%`;
  maxHeight?: `${number}px` | `${number}%`;
  flex?: number;
  spacing?: Spacing;
  margin?: Margin;
  paddingAll?: Padding;
  paddingTop?: Padding;
  paddingBottom?: Padding;
  paddingStart?: Padding;
  paddingEnd?: Padding;
  position?: Position;
  offsetTop?: Offset;
  offsetBottom?: Offset;
  offsetStart?: Offset;
  offsetEnd?: Offset;
  action?: Action;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  background?: {
    type?: "linearGradient";
    angle?: `${number}deg`;
    startColor?: string;
    endColor?: string;
    centerColor?: string;
    centerPosition: `${number}%`;
  };
}

export type HorizontalBoxComponent = BoxComponentBase & {
  type: "box";
  layout: "horizontal";
  contents: (
    | BoxComponent
    | ButtonComponent
    | ImageComponent
    | TextComponent
    | SeparatorComponent
    | FillerComponent
  )[];
};

export type VerticalBoxComponent = BoxComponentBase & {
  type: "box";
  layout: "vertical";
  contents: (
    | BoxComponent
    | ButtonComponent
    | ImageComponent
    | TextComponent
    | SeparatorComponent
    | FillerComponent
  )[];
};

export type BaselineBoxComponent = BoxComponentBase & {
  type: "box";
  layout: "baseline";
  contents: (IconComponent | TextComponent | FillerComponent)[];
};

export type BoxComponent =
  | HorizontalBoxComponent
  | VerticalBoxComponent
  | BaselineBoxComponent;
