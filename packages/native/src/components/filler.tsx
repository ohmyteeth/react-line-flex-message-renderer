import type { FillerComponent } from "@ohmyteeth/line-flex-message-renderer-core";
import { View } from "react-native";
import { useDebugMode } from "../context/debug.js";

export const Filler = ({ flex }: FillerComponent) => {
  const isDebugMode = useDebugMode();
  return <View style={{ flexGrow: 1, flexShrink: 0, flexBasis: 0, flex, ...(isDebugMode ? { borderColor: "red", borderWidth: 1 } : {}) }} />;
};
