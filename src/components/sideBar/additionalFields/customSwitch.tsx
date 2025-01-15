import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setOilDiscriptions,
  setStockZeroFlag,
} from "@/store/reducers/DataReducer";
import { RootState } from "@/store/store";
import { SwitchProps } from "@/props/switchProps";

export const CustomSwitch = () => {
  const dispatch = useDispatch();
  const { stock_zero_flag, oil_discriptions } = useSelector(
    (state: RootState) => state.data
  );

  const filterOptions: SwitchProps[] = [
    {
      label: "Убрать нулевые остатки",
      checked: stock_zero_flag,
      onChange: () => dispatch(setStockZeroFlag(!stock_zero_flag)),
    },
    {
      label: "Добавить описание товара",
      checked: oil_discriptions,
      onChange: () => dispatch(setOilDiscriptions(!oil_discriptions)),
    },
  ];

  return (
    <FormGroup sx={{ marginTop: 1 }}>
      {filterOptions.map((option, index) => (
        <FormControlLabel
          key={index}
          control={
            <Switch checked={option.checked} onChange={option.onChange} />
          }
          label={option.label}
          labelPlacement="start"
          sx={{
            marginLeft: 0.5,
            marginBottom: 2,
            justifyContent: "space-between",
            width: "97%",
          }}
        />
      ))}
    </FormGroup>
  );
};
