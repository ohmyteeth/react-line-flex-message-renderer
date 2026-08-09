import {
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
import styles from "./box.module.css";
import clsx from "clsx";

const getBackgroundLinearGradient = (background: BoxComponent["background"]) => {
  if (!background) return undefined;

  if (background.centerColor) {
    return `linear-gradient(${background.angle}, ${background.startColor} 0%, ${background.centerColor} ${background.centerPosition}, ${background.endColor} 100%)`;
  }

  return `linear-gradient(${background.angle}, ${background.startColor} 0%, ${background.endColor} 100%)`;
};

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
  const bg = getBackgroundLinearGradient(background);
  const handleClick = () => {
    if (action) {
      onClick?.(action);
    }
  };

  return (
    <div
      className={clsx(
        styles.box,
        layout === "baseline" && styles.baseline,
        layout === "horizontal" && styles.horizontal,
        layout === "vertical" && styles.vertical,
      )}
      style={{
        ...(layout === "baseline"
          ? {
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            width: "100%",
            columnGap: getSpacingSize(spacing),
          }
          : layout === "horizontal"
            ? { display: "flex", flexDirection: "row", columnGap: getSpacingSize(spacing) }
            : {
              display: "flex",
              flexDirection: "column",
              rowGap: getSpacingSize(spacing),
            }),
        flex: flex ? (flex === 0 ? "none" : flex) : undefined,
        width,
        maxWidth,
        height,
        maxHeight,
        backgroundColor,
        borderColor,
        borderWidth: getBorderWidth(borderWidth),
        borderRadius: getBorderRadius(cornerRadius),
        paddingTop: getPaddingSize(paddingTop),
        paddingBottom: getPaddingSize(paddingBottom),
        paddingLeft: getPaddingSize(paddingStart),
        paddingRight: getPaddingSize(paddingEnd),
        padding: getPaddingSize(paddingAll),
        marginTop: getMarginSize(margin),
        position: position === undefined ? "relative" : position,
        alignItems,
        justifyContent,
        top: getOffset(offsetTop),
        bottom: getOffset(offsetBottom),
        left: getOffset(offsetStart),
        right: getOffset(offsetEnd),
        ...(bg && { background: bg }),
        ...(width && { flexShrink: 0 }),
      }}
      onClick={handleClick}
    >
      {contents.map((content, i) => (
        <React.Fragment key={i}>{renderComponent(content)}</React.Fragment>
      ))}
    </div>
  );
};
