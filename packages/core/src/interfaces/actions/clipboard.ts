export type ClipboardAction = {
  type: "clipboard";
  label?: string;
  clipboardText: string;
};
