import { Button } from "@mui/material";
import React from "react";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { useDispatch, useSelector } from "react-redux";
import {
  setOilDiscriptions,
  setStockShowFlag,
  setStockZeroFlag,
} from "../../../store/reducers/DataReducer";

export const Filter = () => {
  const dispatch = useDispatch();
  const { stock_zero_flag, oil_discriptions,stock_show_flag } = useSelector(
    (state: any) => state.data
  );

  const buttonStyle = (isActive: boolean) => ({
    color: "black",
    marginLeft: "10px",
    border: "1px solid #ccc",
    fontSize: "13px",
    height: "40px",
    backgroundColor: isActive ? "lightgrey" : "white",

    ":hover": {
      border: "1px solid black",
      backgroundColor: isActive ? "#e0e0e0" : "white",
    },
  });

  return (
    <div>
      <Button
        sx={buttonStyle(stock_zero_flag)}
        onClick={() => dispatch(setStockZeroFlag(!stock_zero_flag))}
      >
        <RemoveShoppingCartIcon style={{ marginRight: 7 }} />
        Убрать нулевые остатки
      </Button>
      <Button
        sx={buttonStyle(oil_discriptions)}
        onClick={() => dispatch(setOilDiscriptions(!oil_discriptions))}
      >
        <DescriptionIcon style={{ marginRight: 7 }} />
        Описание товара
      </Button>

      <Button
        sx={buttonStyle(stock_show_flag)} 
        onClick={() => dispatch(setStockShowFlag(!stock_show_flag))}
      >
        <ProductionQuantityLimitsIcon style={{ marginRight: 7 }} />
        Показать остатки
      </Button>
    </div>
  );
};
