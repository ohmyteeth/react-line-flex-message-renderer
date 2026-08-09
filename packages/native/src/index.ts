import { registerComponents } from "@ohmyteeth/line-flex-message-renderer-core";
import { Filler } from "./components/filler.js";
import { Icon } from "./components/icon.js";
import { FlexMessageRenderer } from "./renderer.js";
import { Span } from "./components/span.js";
import { Button } from "./components/button.js";
import { Image } from "./components/image.js";
import { Video } from "./components/video.js";
import { Box } from "./components/box.js";
import { Text } from "./components/text.js";
import { Separator } from "./components/separator.js";

registerComponents({
  box: Box,
  button: Button,
  filler: Filler,
  icon: Icon,
  image: Image,
  separator: Separator,
  span: Span,
  text: Text,
  video: Video,
});

export { FlexMessageRenderer };
