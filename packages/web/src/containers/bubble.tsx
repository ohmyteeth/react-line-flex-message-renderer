import {
  renderComponent,
  type Action,
  type BubbleContainer,
  type ClickHandler,
} from "@ohmyteeth/line-flex-message-renderer-core";
import clsx from "clsx";
import styles from "./carousel.module.css";

export const Bubble = ({
  body,
  direction,
  footer,
  header,
  hero,
  size,
  styles: s,
  action,
  onClick,
}: BubbleContainer & { onClick?: ClickHandler | undefined }) => {
  const hasHero = !!hero;
  const hasFooter = !!footer;
  const hasHeader = !!header;
  const handleClick = (action: Action) => {
    if (onClick) {
      onClick(action);
    }
  };

  return (
    <div
      className={clsx(s.bubble, s[size ?? "mega"])}
      dir={direction}
      onClick={action ? () => handleClick(action) : undefined}
    >
      <div className={s.inner}>
        {header && (
          <div
            className={styles.header}
            style={{
              backgroundColor: s?.header?.backgroundColor ?? "#fff",
              borderBottom: s?.header?.separator
                ? `1px solid ${s?.header?.separatorColor ?? "#000"}`
                : "none",
              borderColor: s?.header?.separatorColor ?? "#000",
            }}
          >
            {renderComponent(header, onClick)}
          </div>
        )}

        {hero && (
          <div
            className={styles.hero}
            style={{ backgroundColor: s?.hero?.backgroundColor ?? "#fff" }}
          >
            {renderComponent(hero, onClick)}
          </div>
        )}

        {body && (
          <div
            className={clsx(
              styles.body,
              hasHeader && !body.paddingAll && s["body-with-header"],
              hasHero && s["body-with-hero"],
              hasFooter && s["body-with-footer"],
              !body.paddingAll && s["with-padding"],
            )}
            style={{ backgroundColor: s?.body?.backgroundColor ?? "#fff" }}
          >
            {renderComponent(body, onClick)}
          </div>
        )}

        {footer && (
          <div
            className={styles.footer}
            style={{
              backgroundColor: s?.footer?.backgroundColor ?? "#fff",
              borderTop: s?.footer?.separator
                ? `1px solid ${s?.footer?.separatorColor ?? "#000"}`
                : "none",
              borderColor: s?.footer?.separatorColor ?? "#000",
            }}
          >
            {renderComponent(footer, onClick)}
          </div>
        )}
      </div>
    </div>
  );
};
