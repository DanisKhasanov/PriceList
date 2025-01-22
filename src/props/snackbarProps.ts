import {  OptionsObject, SnackbarMessage } from "notistack";

export interface SnackbarProps {
  (message: SnackbarMessage, options?: OptionsObject): void;
}