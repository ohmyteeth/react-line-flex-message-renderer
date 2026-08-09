import type { BubbleContainer } from "./bubble.js";

export interface CarouselContainer {
  type: "carousel";
  contents: BubbleContainer[];
}
