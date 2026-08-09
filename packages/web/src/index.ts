import { registerComponents } from "@ohmyteeth/line-flex-message-renderer-core";
import { FlexMessageRenderer } from "./renderer.js";
import { Button } from "./components/button.js";
import { Image } from "./components/image.js";
import { Box } from "./components/box.js";
import { Filler } from "./components/filler.js";
import { Icon } from "./components/icon.js";
import { Separator } from "./components/separator.js";
import { Span } from "./components/span.js";
import { Video } from "./components/video.js";
import { Text } from "./components/text.js";

import "./globals.css";

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
