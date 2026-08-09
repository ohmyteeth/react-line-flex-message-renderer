import type { VideoComponent } from "@ohmyteeth/line-flex-message-renderer-core";

import type { ClickHandler } from "@ohmyteeth/line-flex-message-renderer-core";

export const Video = ({
  action,
  onClick,
}: VideoComponent & { onClick?: ClickHandler | undefined }) => {
  const handleClick = () => {
    if (action) {
      onClick?.(action);
    }
  };

  return <div onClick={handleClick} />;
};
