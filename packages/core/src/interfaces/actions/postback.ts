import type { InputOption } from "./property-types.js";

export type PostbackAction = {
  type: "postback";
  data: string;
  displayText?: string;
  text?: string;
  inputOption?: InputOption;
  fillInText?: string;
};
