export interface CustomFieldProps {
  label: string;
  placeholder: string;
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
  value: string;
  onChange: (value: string) => void;
  isTextArea?: boolean;
}
