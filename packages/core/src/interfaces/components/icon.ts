import type { IconSize, Margin, Offset, Position } from "./property-types.js";

export type IconComponent = {
  type: "icon";
  url: string;
  margin?: Margin;
  position?: Position;
  offsetTop?: Offset;
  offsetBottom?: Offset;
  offsetStart?: Offset;
  offsetEnd?: Offset;
  size?: IconSize;
  scaling?: boolean;
  aspectRatio?: `${number}:${number}`;
};
