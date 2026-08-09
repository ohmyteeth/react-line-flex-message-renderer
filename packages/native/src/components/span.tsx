import { getActualNumericSize, getIconSize, type SpanComponent } from "@ohmyteeth/line-flex-message-renderer-core";
import { Text } from "react-native";

export const Span = ({ text, color, size, weight, style, decoration }: SpanComponent) => {
  return <Text style={{
    color,
    fontSize: getActualNumericSize(getIconSize(size)),
    fontStyle: style,
    fontWeight: weight === "regular" ? "400" : weight,
    textDecorationLine: decoration !== "none" ? decoration : undefined,
  }}>
    {text}
  </Text>;
};
