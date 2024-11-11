import React from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
const CartInNavBar = ({totalQuantity}) => {
  return (
    <>
      <Badge badgeContent={totalQuantity || 0} max={9} color="error">
        <ShoppingCartOutlinedIcon />
      </Badge>
    </>
  );
};

export default CartInNavBar;
