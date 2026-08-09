import type { FillerComponent } from "@ohmyteeth/line-flex-message-renderer-core";
import { View } from "react-native";

export const Filler = ({ flex }: FillerComponent) => {
  return <View style={{ flexGrow: 1, flexShrink: 0, flexBasis: 0, flex }} />;
};
