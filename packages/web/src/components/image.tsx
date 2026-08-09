import {
  getImageSize,
  getMarginSize,
  getOffset,
  type ImageComponent,
  type ClickHandler,
} from "@ohmyteeth/line-flex-message-renderer-core";
import styles from "./image.module.css";

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
  const handleClick = () => {
    if (action) {
      onClick?.(action);
    }
  };

  return (
    <div
      className={styles.img}
      style={{ flex: flex === 0 ? "none" : flex, margin: getMarginSize(margin) ?? "0 auto" }}
    >
      <img
        style={{
          aspectRatio: aspectRatio?.split(":").join("/") ?? "1",
          objectFit: aspectMode === "cover" ? "cover" : "contain",
          backgroundColor,
          position: position === undefined ? "relative" : position,
          top: getOffset(offsetTop),
          bottom: getOffset(offsetBottom),
          left: getOffset(offsetStart),
          right: getOffset(offsetEnd),
          height: "100%",
          width: getImageSize(size),
        }}
        src={url}
        onClick={handleClick}
      />
    </div>
  );
};
