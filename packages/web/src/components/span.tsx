import { getIconSize, type SpanComponent } from "@ohmyteeth/line-flex-message-renderer-core";

export const Span = ({ text, color, size, weight, style, decoration }: SpanComponent) => {
  const computedStyles: React.CSSProperties = {
    color,
    fontSize: getIconSize(size),
    fontStyle: style,
    fontWeight: weight === "regular" ? "400" : weight,
    textDecoration: decoration !== "none" ? decoration : undefined,
  };

  return <span style={computedStyles}>{text}</span>;
};
