import {
  getButtonHeight,
  getMarginSize,
  getOffset,
  type ButtonComponent,
  type ClickHandler,
} from "@ohmyteeth/line-flex-message-renderer-core";
import styles from "./button.module.css";

export const Button = ({
  action,
  adjustMode,
  color,
  flex,
  gravity,
  height,
  margin,
  offsetBottom,
  offsetEnd,
  offsetStart,
  offsetTop,
  position,
  scaling,
  style,
  onClick,
}: ButtonComponent & { onClick?: ClickHandler | undefined }) => {
  const handleClick = () => {
    if (action) {
      onClick?.(action);
    }
  };

  return (
    <a
      href="#"
      className={styles[style ?? "link"]}
      style={{
        display: "flex",
        flex: flex === 0 ? "none" : `${flex} 0 auto`,
        flexShrink: 0,
        top: getOffset(offsetTop),
        bottom: getOffset(offsetBottom),
        left: getOffset(offsetStart),
        right: getOffset(offsetEnd),
        marginTop: getMarginSize(margin),
        position: position === undefined ? "relative" : position,
        height: getButtonHeight(height),
        backgroundColor: color,
      }}
      onClick={handleClick}
    >
      {action.type === "uri" && action.label}
    </a>
  );
};
