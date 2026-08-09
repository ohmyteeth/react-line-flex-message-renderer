import type { CameraAction } from "./camera.js";
import type { CameraRollAction } from "./cameraroll.js";
import type { ClipboardAction } from "./clipboard.js";
import type { DateTimePickerAction } from "./datetimepicker.js";
import type { LocationAction } from "./location.js";
import type { MessageAction } from "./message.js";
import type { PostbackAction } from "./postback.js";
import type { RichMenuSwitchAction } from "./richmenuswitch.js";
import type { UriAction } from "./uri.js";

export type {
  CameraAction,
  CameraRollAction,
  ClipboardAction,
  DateTimePickerAction,
  LocationAction,
  MessageAction,
  PostbackAction,
  RichMenuSwitchAction,
  UriAction,
};

export type Action =
  | CameraAction
  | CameraRollAction
  | ClipboardAction
  | DateTimePickerAction
  | LocationAction
  | MessageAction
  | PostbackAction
  | RichMenuSwitchAction
  | UriAction;
