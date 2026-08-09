import {
  getIconSize,
  getMarginSize,
  getOffset,
  type IconComponent,
} from "@ohmyteeth/line-flex-message-renderer-core";
import styles from "./icon.module.css";

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
  return (
    <div style={{ width: getIconSize(size), flexShrink: 0 }}>
      <img
        className={styles["icon-span"]}
        style={{
          aspectRatio: aspectRatio?.split(":").join("/"),
          top: getOffset(offsetTop),
          bottom: getOffset(offsetBottom),
          left: getOffset(offsetStart),
          right: getOffset(offsetEnd),
          marginTop: getMarginSize(margin),
          position: position === undefined ? "relative" : position,
        }}
        src={url}
      />
    </div>
  );
};
