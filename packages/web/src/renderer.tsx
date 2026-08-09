import type {
  Action,
  BubbleContainer,
  CarouselContainer,
} from "@ohmyteeth/line-flex-message-renderer-core";
import { useCallback, useMemo } from "react";
import { Bubble } from "./containers/bubble.js";
import { Carousel } from "./containers/carousel.js";

type FlexMessageRendererProps = {
  /**
   * A JSON string representing the Flex Message to be rendered.
   */
  json: string;

  onAction?: (action: Action) => void;
};

export const FlexMessageRenderer = ({ json, onAction }: FlexMessageRendererProps) => {
  const data = useMemo(() => {
    return JSON.parse(json) as CarouselContainer | BubbleContainer;
  }, [json]);
  const handleClick = useCallback(
    (action?: Action) => {
      if (action) {
        onAction?.(action);
      }
    },
    [onAction],
  );

  switch (data.type) {
    case "bubble":
      return <Bubble {...data} onClick={handleClick} />;

    case "carousel":
      return <Carousel {...data} onClick={handleClick} />;

    default:
      throw new Error(`Unsupported Flex Message type: ${data}`);
  }
};
