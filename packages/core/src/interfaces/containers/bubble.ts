import type { Action } from "../actions/index.js";
import type {
  BoxComponent,
  ImageComponent,
  VideoComponent,
} from "../components/index.js";

export interface BlockStyle {
  backgroundColor?: string;
  separator?: boolean;
  separatorColor?: string;
}

export interface BubbleContainer {
  type: "bubble";
  size?: "nano" | "micro" | "deca" | "hecto" | "kilo" | "mega" | "giga";
  direction?: "ltr" | "rtl";
  header?: BoxComponent;
  hero?: BoxComponent | ImageComponent | VideoComponent;
  body?: BoxComponent;
  footer?: BoxComponent;
  style?: {
    header?: BlockStyle;
    hero?: BlockStyle;
    body?: BlockStyle;
    footer?: BlockStyle;
  };
  action?: Action;
}
