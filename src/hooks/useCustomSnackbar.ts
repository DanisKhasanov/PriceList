import { useSnackbar, OptionsObject, SnackbarMessage } from "notistack";

const useCustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (message: SnackbarMessage, options?: OptionsObject) => {
    enqueueSnackbar(message, options);
  };

  return { showSnackbar };
};

export default useCustomSnackbar;