import {
  getImageSize,
  getMarginSize,
  getOffset,
  type ImageComponent,
  type ClickHandler,
  getActualSize,
} from "@ohmyteeth/line-flex-message-renderer-core";
import { Image as RNImage, TouchableOpacity, View } from "react-native";
import { useParentFlexDirection } from "../hooks/useParentFlexDirection.js";

export const Image = ({
  url,
  flex,
  position,
  margin,
  offsetTop,
  offsetBottom,
  offsetStart,
  offsetEnd,
  align,
  gravity,
  size,
  aspectRatio,
  aspectMode,
  backgroundColor,
  animated,
  action,
  onClick,
}: ImageComponent & { onClick?: ClickHandler | undefined }) => {
  const parentDirection = useParentFlexDirection();
  const rawWidth = getImageSize(size);
  const sizeWidth = rawWidth === "unset" ? undefined : getActualSize(rawWidth);
  // When `flex` is meant to grow this image within a row/column of siblings, let it fill 100% of
  // whatever space it's allocated instead of the fixed `size` width — otherwise the fixed width fights
  // the flex-grown container for space (the fixed width wins, and the image can end up misplaced or
  // fully covered by a sibling that gets laid out for the space the image should have used).
  const width = flex ? "100%" : sizeWidth;
  const handleClick = () => {
    if (action) {
      onClick?.(action);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        // Explicit flexGrow/flexShrink, not the bare `flex` shorthand (only to avoid ambiguity — the
        // shorthand's implied flexBasis:0% is actually what we want here, unlike box.tsx/text.tsx).
        // flexBasis stays "0", not "auto": an "auto" basis makes RN measure this View's content to find
        // its natural size, and Image's own natural-size measurement falls back to the source asset's
        // native pixel size instead of respecting `width`, letting one image claim all of its siblings'
        // space. Basis 0 sidesteps that measurement entirely — the final size is already fully
        // determined by the explicit width/aspectRatio below regardless of the starting basis.
        ...(flex !== undefined
          ? { flexGrow: flex === 0 ? 0 : flex, flexShrink: 0, flexBasis: flex === 0 ? "auto" : 0 }
          : { flexShrink: 1 }),
        // Same rule as below: only force a % height when width can't drive sizing on its own — otherwise
        // this resolves against whatever definite height it finds further up and stretches the whole card.
        ...(width === undefined ? { height: "100%" } : {}),
        // Auto left/right margins center a naturally-sized image, but they compete with flexGrow for the
        // same leftover space — skip them when `flex` is meant to actually grow this image instead.
        // `margin` itself is space along whichever axis the parent lays siblings out on — marginTop in a
        // "column" parent, marginLeft in a "row" (horizontal/baseline) parent.
        ...(margin
          ? parentDirection === "column"
            ? { marginTop: getActualSize(getMarginSize(margin)) }
            : { marginLeft: getActualSize(getMarginSize(margin)) }
          : flex
            ? {}
            : { marginTop: 0, marginBottom: 0, marginRight: "auto", marginLeft: "auto" }),
      }}
    >
      {/* Only one of width/height may be definite — the other must stay unset so aspectRatio can derive it. */}
      <TouchableOpacity onPress={handleClick} style={width !== undefined ? { width } : { height: "100%" }}>
        <RNImage
          style={{
            aspectRatio: aspectRatio?.split(":").join("/") ?? "1",
            objectFit: aspectMode === "cover" ? "cover" : "contain",
            backgroundColor,
            position: position === undefined ? "relative" : position,
            top: getActualSize(getOffset(offsetTop)),
            bottom: getActualSize(getOffset(offsetBottom)),
            left: getActualSize(getOffset(offsetStart)),
            right: getActualSize(getOffset(offsetEnd)),
            ...(width !== undefined ? { width } : { height: "100%" }),
          }}
          source={{ uri: url }}
        />
      </TouchableOpacity>
    </View>
  );
};
