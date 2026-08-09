import {
  getActualNumericSize,
  getActualSize,
  getBorderRadius,
  getBorderWidth,
  getMarginSize,
  getOffset,
  getPaddingSize,
  getSpacingSize,
  renderComponent,
  type BoxComponent,
  type ClickHandler,
} from "@ohmyteeth/line-flex-message-renderer-core";
import React from "react";
import { TouchableOpacity, type ViewStyle } from "react-native";
import { ParentFlexDirectionProvider, useParentFlexDirection } from "../hooks/useParentFlexDirection.js";

export const Box = ({
  layout,
  contents,
  backgroundColor,
  borderColor,
  borderWidth,
  cornerRadius,
  width,
  maxWidth,
  height,
  maxHeight,
  flex,
  spacing,
  margin,
  paddingAll,
  paddingTop,
  paddingBottom,
  paddingStart,
  paddingEnd,
  position,
  offsetTop,
  offsetBottom,
  offsetStart,
  offsetEnd,
  justifyContent,
  alignItems,
  background,
  action,
  onClick,
}: BoxComponent & { onClick?: ClickHandler | undefined }) => {
  const handleClick = () => {
    if (action) {
      onClick?.(action);
    }
  };
  const parentDirection = useParentFlexDirection();
  const ownDirection = layout === "vertical" ? "column" : "row";

  const containerStyle: ViewStyle = {
    ...(layout === "baseline"
      ? { flexDirection: "row", alignItems: "baseline", columnGap: getActualSize(getSpacingSize(spacing)) }
      : layout === "horizontal"
        ? { flexDirection: "row", columnGap: getActualSize(getSpacingSize(spacing)) }
        : { flexDirection: "column", rowGap: getActualSize(getSpacingSize(spacing)) }),
    // flexBasis of 0 only makes sense along the parent's main axis when that axis has a definite total to
    // distribute — true for "row" parents here (bubble width is always fixed), but not for "column"
    // parents (bubble height is always auto/content-driven). In a "column" parent, flexBasis:0 makes this
    // box contribute nothing to that auto-height calculation, collapsing the whole ancestor chain to 0.
    ...(flex !== undefined
      ? {
          flexGrow: flex === 0 ? 0 : flex,
          flexShrink: 0,
          flexBasis: flex === 0 || parentDirection === "column" ? "auto" : 0,
        }
      : { flexShrink: 1 }),
    width: getActualSize(width) ?? (layout === "baseline" ? "100%" : undefined),
    maxWidth: getActualSize(maxWidth),
    height: getActualSize(height),
    maxHeight: getActualSize(maxHeight),
    backgroundColor: backgroundColor ?? background?.startColor,
    borderColor,
    borderWidth: getActualNumericSize(getBorderWidth(borderWidth)),
    borderRadius: getActualNumericSize(getBorderRadius(cornerRadius)),
    // Unlike CSS, RN's borderRadius only rounds this box's own background/border — it doesn't clip
    // children to the rounded shape unless overflow is also hidden (e.g. a square image inside a
    // circular avatar box would otherwise cover the rounded corners entirely).
    ...(cornerRadius !== undefined ? { overflow: "hidden" } : {}),
    paddingTop: getActualSize(getPaddingSize(paddingTop)),
    paddingBottom: getActualSize(getPaddingSize(paddingBottom)),
    paddingLeft: getActualSize(getPaddingSize(paddingStart)),
    paddingRight: getActualSize(getPaddingSize(paddingEnd)),
    padding: getActualSize(getPaddingSize(paddingAll)),
    // Same rule as text.tsx: `margin` is space along whichever axis the parent lays siblings out on —
    // marginTop in a "column" parent, marginLeft in a "row" (horizontal/baseline) parent.
    ...(parentDirection === "column"
      ? { marginTop: getActualSize(getMarginSize(margin)) }
      : { marginLeft: getActualSize(getMarginSize(margin)) }),
    position: position === undefined ? "relative" : position,
    // `alignItems` here (from the JSON) must win when explicitly set, but otherwise must NOT blindly
    // override the "baseline" set above for `layout:"baseline"` — it was doing exactly that (since this
    // key appears later in the same object), silently turning every baseline row into RN's default
    // "stretch" instead, which stretches every child to match the tallest sibling's height.
    alignItems: alignItems ?? (layout === "baseline" ? "baseline" : undefined),
    justifyContent,
    top: getActualSize(getOffset(offsetTop)),
    bottom: getActualSize(getOffset(offsetBottom)),
    left: getActualSize(getOffset(offsetStart)),
    right: getActualSize(getOffset(offsetEnd)),
    ...(width ? { flexShrink: 0 } : {}),
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={handleClick}>
      <ParentFlexDirectionProvider direction={ownDirection}>
        {contents.map((content, i) => (
          <React.Fragment key={i}>{renderComponent(content)}</React.Fragment>
        ))}
      </ParentFlexDirectionProvider>
    </TouchableOpacity>
  );
};
