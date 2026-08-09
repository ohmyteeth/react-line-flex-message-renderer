import type { FillerComponent } from "@ohmyteeth/line-flex-message-renderer-core";
import styles from "./filler.module.css";

export const Filler = ({ flex }: FillerComponent) => {
  return <div className={styles.filler} style={{ flex: flex === 0 ? "none" : flex }} />;
};
