import { getMarginSize, type SeparatorComponent } from "@ohmyteeth/line-flex-message-renderer-core";
import styles from "./separator.module.css";

export const Separator = ({ margin, color }: SeparatorComponent) => {
  return (
    <div
      className={styles.separator}
      style={{ borderColor: color ?? "#d4d6da", marginTop: getMarginSize(margin) }}
    />
  );
};
