export interface SnackbarProps {
  (message: string, options: { variant: string }): void;
}