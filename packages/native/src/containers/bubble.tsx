import {
  renderComponent,
  type BubbleContainer,
  type ClickHandler,
} from "@ohmyteeth/line-flex-message-renderer-core";
import { StyleSheet, TouchableOpacity, View, type StyleProp, type ViewStyle, type LayoutChangeEvent } from "react-native";

export const Bubble = ({
  body,
  direction,
  footer,
  header,
  hero,
  size,
  style,
  action,
  onClick,
  containerStyle,
  onLayout,
}: BubbleContainer & {
  onClick?: ClickHandler | undefined;
  // Native-only, not part of the Flex Message spec: lets Carousel measure every bubble's natural height
  // and stretch them all to match the tallest one, since ScrollView content doesn't do this on its own.
  containerStyle?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
}) => {
  const hasHero = !!hero;
  const hasFooter = !!footer;
  const hasHeader = !!header;
  const handleClick = () => {
    if (action) {
      onClick?.(action);
    }
  };

  const inner = {
    ...Styles.bubbleInner,
    // Only when Carousel hands us an explicit (now definite, non-percentage) height to match: without
    // this, bubbleInner stays content-sized and the extra space added below is just blank/transparent.
    ...(containerStyle !== undefined && { flexGrow: 1 }),
    ...(size === "nano" && Styles.nanoInner),
    ...(size === "micro" && Styles.microInner),
    ...(size === "deca" && Styles.decaInner),
    ...(size === "hecto" && Styles.hectoInner),
    ...(size === "kilo" && Styles.kiloInner),
    ...(size === "mega" && Styles.megaInner),
    ...(size === "giga" && Styles.gigaInner),
  };

  return (
    <TouchableOpacity
      style={[{ ...Styles.bubble, ...Styles[size ?? "mega"] }, containerStyle]}
      onPress={handleClick}
      onLayout={onLayout}
    >
      <View style={inner}>
        {header && (
          <View
            style={{
              backgroundColor: style?.header?.backgroundColor ?? "#fff",
              borderBottomWidth: style?.header?.separator ? 1 : 0,
              borderColor: style?.header?.separatorColor ?? "#000",
            }}
          >
            {renderComponent(header, onClick)}
          </View>
        )}

        {hero && (
          <View style={{ backgroundColor: style?.hero?.backgroundColor ?? "#fff" }}>
            {renderComponent(hero, onClick)}
          </View>
        )}

        {body && (
          <View
            style={{
              ...Styles.body,
              ...(hasHeader && !body.paddingAll && Styles.bodyWithHeader),
              // The web port zeroes this out specifically for "micro" bubbles (see its CSS), since a
              // micro body commonly sets its own smaller `paddingAll` — without this exception the two
              // paddings stack (this wrapper's 20px plus the body Box's own), roughly doubling the gap.
              ...(hasHero && size !== "micro" && Styles.bodyWithHero),
              ...(hasFooter && Styles.bodyWithFooter),
              ...(!body.paddingAll && Styles.withPadding),
              backgroundColor: style?.body?.backgroundColor ?? "#fff",
            }}
          >
            {renderComponent(body, onClick)}
          </View>
        )}

        {footer && (
          <View
            style={{
              ...Styles.footer,
              backgroundColor: style?.footer?.backgroundColor ?? "#fff",
              borderTopWidth: style?.footer?.separator ? 1 : 0,
              borderColor: style?.footer?.separatorColor ?? "#000",
            }}
          >
            {renderComponent(footer, onClick)}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  bubble: {
    flexDirection: "column",
    width: "100%",
  },
  bubbleInner: {
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: 10,
  },
  nano: {
    width: 120,
    maxWidth: 120,
  },
  nanoInner: {
    borderRadius: 10,
  },
  micro: {
    width: 160,
    maxWidth: 160,
  },
  microInner: {
    borderRadius: 10,
  },
  deca: {
    width: 220,
    maxWidth: 220,
  },
  decaInner: {
    borderRadius: 10,
  },
  hecto: {
    width: 241,
    maxWidth: 241,
  },
  hectoInner: {
    borderRadius: 10,
  },
  kilo: {
    width: 260,
    maxWidth: 260,
  },
  kiloInner: {
    borderRadius: 10,
  },
  mega: {
    width: 300,
    maxWidth: 300,
  },
  megaInner: {
    borderRadius: 17,
  },
  giga: {
    width: 340,
    maxWidth: 340,
  },
  gigaInner: {
    borderRadius: 5,
  },
  body: {
    flexGrow: 1,
  },
  withPadding: {
    padding: 20,
  },
  bodyWithHeader: {
    padding: 20,
  },
  bodyWithHero: {
    padding: 20,
  },
  bodyWithFooter: {
    paddingBottom: 10,
  },
  footer: {
    padding: 10,
  },
});
