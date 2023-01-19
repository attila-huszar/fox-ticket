export interface ConditionalWrapProps {
  condition: boolean;
  wrapper: (children: React.ReactElement) => JSX.Element;
  children: React.ReactElement;
}
