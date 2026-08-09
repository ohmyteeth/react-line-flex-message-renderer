import {
  type CarouselContainer,
  type ClickHandler,
} from "@ohmyteeth/line-flex-message-renderer-core";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, type LayoutChangeEvent } from "react-native";
import { Bubble } from "./bubble.js";

export const Carousel = ({ contents, onClick }: CarouselContainer & { onClick?: ClickHandler }) => {
  // `alignItems: "stretch"` doesn't equalize bubble heights here — ScrollView content doesn't participate
  // in cross-axis stretch the way a plain flex row does — so each bubble's natural height is measured via
  // onLayout, and once all have reported in, every bubble is pinned to the tallest one's height.
  const [heights, setHeights] = useState<Record<number, number>>({});
  const measured = Object.keys(heights).length === contents.length;
  const maxHeight = measured ? Math.max(...Object.values(heights)) : undefined;

  const handleLayout = useCallback((index: number, event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeights((prev) => (prev[index] === height ? prev : { ...prev, [index]: height }));
  }, []);

  return (
    // TODO: web uses `scroll-snap-type: x mandatory` to snap between bubbles; ScrollView has no direct
    // equivalent (would need `snapToInterval`/`snapToOffsets`, which assume a fixed bubble width per size).
    <ScrollView horizontal contentContainerStyle={Styles.carousel}>
      {contents.map((bubble, index) => (
        <Bubble
          key={index}
          {...bubble}
          onClick={onClick}
          containerStyle={maxHeight !== undefined ? { height: maxHeight } : undefined}
          onLayout={measured ? undefined : (event) => handleLayout(index, event)}
        />
      ))}
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  carousel: {
    flexDirection: "row",
    columnGap: 20,
    // Not "stretch": that's exactly the unreliable ScrollView cross-axis stretch this component works
    // around above — leaving it on lets the very first (pre-measurement) layout pass report an inflated
    // height, which then gets locked in as the "tallest" bubble for everyone to match.
    alignItems: "flex-start",
  },
});
