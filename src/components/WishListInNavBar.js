import React from "react";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const WishListInNavBar = ({ wishlistItems }) => {
  return (
    <>
      <Badge badgeContent={wishlistItems.length} max={9} color="error">
        <FavoriteBorderIcon className="fheart" />
      </Badge>
    </>
  );
};

export default WishListInNavBar;
