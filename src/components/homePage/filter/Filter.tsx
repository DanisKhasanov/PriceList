import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Switch,
  SwitchProps,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setOilDiscriptions,
  setStockShowFlag,
  setStockZeroFlag,
} from "../../../store/reducers/DataReducer";
import { styled } from "@mui/material/styles";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#056bf1",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

interface FilterOption {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const Filter = () => {
  const dispatch = useDispatch();
  const { stock_zero_flag, oil_discriptions, stock_show_flag } = useSelector(
    (state: any) => state.data
  );

  const FilterSwitch = ({ label, checked, onChange }: FilterOption) => (
    <FormControlLabel
      control={<IOSSwitch checked={checked} onChange={onChange} />}
      label={label}
      labelPlacement="start"
      sx={{
        marginLeft: 0.5,
        marginBottom: 1.5,
        justifyContent: "space-between",
        width: "97%",
      }}
    />
  );
  const filterOptions: FilterOption[] = [
    {
      label: "Показать остатки",
      checked: stock_show_flag,
      onChange: () => dispatch(setStockShowFlag(!stock_show_flag)),
    },
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
    <FormGroup>
      {filterOptions.map((option, index) => (
        <FilterSwitch key={index} {...option} />
      ))}
    </FormGroup>
  );
};
