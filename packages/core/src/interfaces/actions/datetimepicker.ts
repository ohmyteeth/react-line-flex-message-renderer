export type DateTimePickerAction = {
  type: "datetimepicker";
  label?: string;
  data: string;
  mode: "date" | "time" | "datetime";
  initial?: string;
  max?: string;
  min?: string;
};
