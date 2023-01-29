export interface InputField {
  text: string;
  color:
    | "success"
    | "warning"
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | undefined;
}
