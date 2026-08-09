import {
  getActualSize,
  getIconSize,
  getMarginSize,
  getOffset,
  type IconComponent,
} from "@ohmyteeth/line-flex-message-renderer-core";
import { Image, View } from "react-native";
import { useParentFlexDirection } from "../hooks/useParentFlexDirection.js";

export const Icon = ({
  url,
  margin,
  position,
  offsetTop,
  offsetBottom,
  offsetStart,
  offsetEnd,
  size,
  scaling,
  aspectRatio,
}: IconComponent) => {
  const parentDirection = useParentFlexDirection();
  // getIconSize(undefined) returns undefined; without this fallback an unsized icon renders at its source's native pixel size.
  const width = getActualSize(getIconSize(size ?? "md"));
  const marginSize = getActualSize(getMarginSize(margin));

  return (
    <View
      style={{
        width,
        flexShrink: 0,
        // `margin` is space along whichever axis the parent lays siblings out on — marginTop in a
        // "column" parent, marginLeft in a "row" (horizontal/baseline) parent.
        ...(parentDirection === "column" ? { marginTop: marginSize } : { marginLeft: marginSize }),
      }}
    >
      <Image
        style={{
          aspectRatio: aspectRatio?.split(":").join("/") ?? "1",
          top: getActualSize(getOffset(offsetTop)),
          bottom: getActualSize(getOffset(offsetBottom)),
          left: getActualSize(getOffset(offsetStart)),
          right: getActualSize(getOffset(offsetEnd)),
          position: position === undefined ? "relative" : position,
        }}
        source={{ uri: url }}
      />
    </View>
  );
};
