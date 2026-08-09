import {
  getActualSize,
  getButtonHeight,
  getMarginSize,
  getOffset,
  type ButtonComponent,
  type ClickHandler,
} from "@ohmyteeth/line-flex-message-renderer-core";
import { Text, TouchableOpacity as Touchable, View } from "react-native";
import { useParentFlexDirection } from "../hooks/useParentFlexDirection.js";

export const Button = ({
  action,
  adjustMode,
  color,
  flex,
  gravity,
  height,
  margin,
  offsetBottom,
  offsetEnd,
  offsetStart,
  offsetTop,
  position,
  scaling,
  style,
  onClick,
}: ButtonComponent & { onClick?: ClickHandler | undefined }) => {
  const parentDirection = useParentFlexDirection();
  const handleClick = () => {
    if (action) {
      onClick?.(action);
    }
  };
  // LINE's default button style is "link" when unspecified (matches the web port's `style ?? "link"`).
  const resolvedStyle = style ?? "link";
  const textColor = resolvedStyle === "primary" ? "#fff" : resolvedStyle === "link" ? "#42659a" : undefined;

  return (
    <Touchable onPress={handleClick}>
      <View
        style={{
          ...(resolvedStyle === "primary" ? {
            backgroundColor: "#17c950",
            width: "100%",
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 16,
            paddingRight: 16,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          } : {}),
          ...(resolvedStyle === "link" ? {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          } : {}),
          // "secondary" has no dedicated look in the web port either (its CSS class is empty) — it just
          // renders as a plain, unstyled box with default text color.
          // Only override flex sizing when `flex` is actually specified (see text.tsx/box.tsx for why).
          // flexBasis is explicitly "auto" (matching the web port's `flex 0 auto`, not `flex 0 0`) so the
          // explicit `height` below still wins — an explicit flexBasis otherwise overrides `height`
          // entirely for flex layout, collapsing the button whenever its parent has no space to grow into.
          ...(flex !== undefined ? { flexGrow: flex === 0 ? 0 : flex, flexShrink: 0, flexBasis: "auto" } : {}),
          top: getActualSize(getOffset(offsetTop)),
          bottom: getActualSize(getOffset(offsetBottom)),
          left: getActualSize(getOffset(offsetStart)),
          right: getActualSize(getOffset(offsetEnd)),
          // `margin` is space along whichever axis the parent lays siblings out on — marginTop in a
          // "column" parent, marginLeft in a "row" (horizontal/baseline) parent.
          ...(parentDirection === "column"
            ? { marginTop: getActualSize(getMarginSize(margin)) }
            : { marginLeft: getActualSize(getMarginSize(margin)) }),
          position: position === undefined ? "relative" : position,
          height: getActualSize(getButtonHeight(height)),
          // `color` should only override the style preset's background when it's actually provided —
          // otherwise this erases the "primary" green / makes "link" buttons blend into the card.
          ...(color !== undefined ? { backgroundColor: color } : {}),
        }}
      >
        {action.type === "uri" && <Text style={{ color: textColor }}>{action.label}</Text>}
      </View>
    </Touchable>
  );
};
