import {
  getIconSize,
  getMarginSize,
  getOffset,
  renderComponent,
  type TextComponent,
  type ClickHandler,
} from "@ohmyteeth/line-flex-message-renderer-core";
import React from "react";
import styles from "./text.module.css";

export const Text = ({
  text,
  contents,
  adjustMode,
  flex,
  margin,
  position,
  offsetTop,
  offsetBottom,
  offsetStart,
  offsetEnd,
  size,
  scaling,
  align,
  gravity,
  wrap,
  lineSpacing,
  maxLines,
  weight,
  color,
  style,
  decoration,
  action,
  onClick,
}: TextComponent & { onClick?: ClickHandler | undefined }) => {
  const handleClick = () => {
    if (action) {
      onClick?.(action);
    }
  };

  if (!text && !contents) {
    return null;
  }

  const computedStyles = {
    color,
    flex: flex === 0 ? "none" : `${flex} 0 0`,
    fontSize: getIconSize(size),
    fontStyle: style,
    fontWeight: weight === "regular" ? "400" : weight,
    textAlign: align === "center" ? "center" : align === "end" ? "right" : "left",
    textDecoration: decoration !== "none" ? decoration : undefined,
    top: getOffset(offsetTop),
    bottom: getOffset(offsetBottom),
    left: getOffset(offsetStart),
    right: getOffset(offsetEnd),
    position: position === undefined ? "relative" : position,
    ...(maxLines && {
      display: "-webkit-box",
      WebkitLineClamp: maxLines,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    }),
    "--margin-size": getMarginSize(margin),
    ...(align === "center" || (align === "end" && flex !== 0) ? { width: "100%" } : {}),
  } as React.CSSProperties;

  if (text) {
    return (
      <div style={computedStyles} onClick={handleClick}>
        <p className={styles.text}>{text}</p>
      </div>
    );
  }

  if (contents) {
    return (
      <div style={computedStyles} className={styles.text} onClick={handleClick}>
        <p
          style={{
            ...(wrap && {
              whiteSpace: "normal",
              wordBreak: "break-word",
              textOverflow: "clip",
              display: "initial",
            }),
          }}
        >
          {contents.map((content, index) => (
            <React.Fragment key={index}>{renderComponent(content)}</React.Fragment>
          ))}
        </p>
      </div>
    );
  }
};
