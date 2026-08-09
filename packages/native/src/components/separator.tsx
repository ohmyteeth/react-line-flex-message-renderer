import { getActualSize, getMarginSize, type SeparatorComponent } from "@ohmyteeth/line-flex-message-renderer-core";
import { View } from "react-native";
import { useParentFlexDirection } from "../hooks/useParentFlexDirection.js";

export const Separator = ({ margin, color }: SeparatorComponent) => {
  const parentDirection = useParentFlexDirection();

  return (
    <View
      style={{
        height: 1,
        backgroundColor: color ?? "#d4d6da",
        // `margin` is space along whichever axis the parent lays siblings out on — marginTop in a
        // "column" parent, marginLeft in a "row" (horizontal/baseline) parent.
        ...(parentDirection === "column"
          ? { marginTop: getActualSize(getMarginSize(margin)) }
          : { marginLeft: getActualSize(getMarginSize(margin)) }),
      }}
    />
  );
};
