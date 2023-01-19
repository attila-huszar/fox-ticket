import { ConditionalWrapProps } from "../interfaces/ConditionalWrapProps";

export const ConditionalWrap: React.FC<ConditionalWrapProps> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : children);
