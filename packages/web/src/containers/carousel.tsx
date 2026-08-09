import {
  type CarouselContainer,
  type ClickHandler,
} from "@ohmyteeth/line-flex-message-renderer-core";
import { Bubble } from "./bubble.js";
import styles from "./carousel.module.css";

export const Carousel = ({ contents, onClick }: CarouselContainer & { onClick?: ClickHandler }) => {
  return (
    <div className={styles.carousel}>
      {contents.map((bubble, index) => (
        <Bubble key={index} {...bubble} onClick={onClick} />
      ))}
    </div>
  );
};
