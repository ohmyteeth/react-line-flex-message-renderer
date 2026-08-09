import type {
  BorderWidth,
  CornerRadius,
  IconSize,
  ImageSize,
  Margin,
  Offset,
  Padding,
  Spacing,
} from "../interfaces/components/property-types.js";

export const getActualSize = (size?: `${number}px` | `${number}%`): number | `${number}%` | undefined => {
  if (size === undefined) {
    return undefined;
  }

  if (size.endsWith("px")) {
    return parseInt(size, 10);
  }

  if (size.endsWith("%")) {
    return size as `${number}%`;
  }

  return undefined;
};

export const getActualNumericSize = (size?: `${number}px` | `${number}%`): number | undefined => {
  if (size === undefined) {
    return undefined;
  }

  if (size.endsWith("px")) {
    return parseInt(size, 10);
  }

  return undefined;
};

export const getIconSize = (size?: IconSize) => {
  switch (size) {
    case "xxs":
      return "11px";

    case "xs":
      return "13px";

    case "sm":
      return "14px";

    case "md":
      return "16px";

    case "lg":
      return "19px";

    case "xl":
      return "22px";

    case "xxl":
      return "29px";

    case "3xl":
      return "35px";

    case "4xl":
      return "48px";

    case "5xl":
      return "74px";

    default:
      return size;
  }
};

export const getMarginSize = (size?: Margin) => {
  switch (size) {
    case "none":
      return "0px";

    case "xs":
      return "2px";

    case "sm":
      return "4px";

    case "md":
      return "8px";

    case "lg":
      return "12px";

    case "xl":
      return "16px";

    case "xxl":
      return "20px";

    default:
      return size;
  }
};

export const getPaddingSize = (size?: Padding) => {
  switch (size) {
    case "none":
      return "0px";

    case "xs":
      return "2px";

    case "sm":
      return "4px";

    case "md":
      return "8px";

    case "lg":
      return "12px";

    case "xl":
      return "16px";

    case "xxl":
      return "20px";

    default:
      return size;
  }
};

export const getOffset = (size?: Offset) => {
  switch (size) {
    case "none":
      return "0px";

    case "xs":
      return "2px";

    case "sm":
      return "4px";

    case "md":
      return "8px";

    case "lg":
      return "12px";

    case "xl":
      return "16px";

    case "xxl":
      return "20px";

    default:
      return size;
  }
};

export const getSpacingSize = (size?: Spacing) => {
  switch (size) {
    case "none":
      return "0px";

    case "xs":
      return "2px";

    case "sm":
      return "4px";

    case "md":
      return "8px";

    case "lg":
      return "12px";

    case "xl":
      return "20px";

    case "xxl":
      return "28px";

    default:
      return size;
  }
};

export const getButtonHeight = (size?: "sm" | "md") => {
  switch (size) {
    case "sm":
      return "40px";

    case "md":
      return "48px";

    default:
      return "40px";
  }
};

export const getImageSize = (size?: ImageSize) => {
  switch (size) {
    case "xxs":
      return "40px";

    case "xs":
      return "60px";

    case "sm":
      return "80px";

    case "md":
      return "100px";

    case "lg":
      return "120px";

    case "xl":
      return "140px";

    case "xxl":
      return "160px";

    case "3xl":
      return "180px";

    case "4xl":
      return "200px";

    case "5xl":
      return "220px";

    case "full":
      return "100%";

    default: {
      if (size?.endsWith("px") || size?.endsWith("%")) {
        return size;
      }

      return "unset";
    }
  }
};

export const getBorderWidth = (size?: BorderWidth) => {
  switch (size) {
    case "none":
      return "0px";

    case "light":
      return "0.5px";

    case "normal":
      return "1px";

    case "medium":
      return "2px";

    case "semi-bold":
      return "3px";

    case "bold":
      return "4px";

    default:
      return size;
  }
};

export const getBorderRadius = (size?: CornerRadius) => {
  switch (size) {
    case "none":
      return "0px";

    case "xs":
      return "2px";

    case "sm":
      return "4px";

    case "md":
      return "8px";

    case "lg":
      return "12px";

    case "xl":
      return "16px";

    case "xxl":
      return "20px";

    default:
      return size;
  }
};