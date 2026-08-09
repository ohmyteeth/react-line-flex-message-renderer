import type { Margin } from "./property-types.js";

export type SeparatorComponent = {
  type: "separator";
  margin?: Margin;
  color?: string;
};
