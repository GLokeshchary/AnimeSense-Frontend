import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./NavBar.css";
import axios from "axios";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import DropDownNavBar from "./DropDownNavBar";
import Badge from "@mui/material/Badge";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchProducts from "./SearchProducts";
import DropDownUser from "./DropDownUser";

function NavBar() {
  const [currLocation, setcurrLocation] = useState({});
  const user = useSelector((state) => state.user.user) || {};
  const AdminLoggedin =
    useSelector((state) => state.user.AdminLoggedIn) || false;
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const wishlistItems =
    useSelector((state) => state.wishlist.wishlistItems) || [];
  useEffect(() => {
    axios
      .get("https://ipapi.co/json")
      .then((response) => setcurrLocation(response.data))
      .catch((error) => console.log(error));
  }, []);

  const getTotalQuantity = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  return (
    <>
      <div className="navbar-container">
        <div className="nav-middle">
          <Link to="/">
            <div className="logo">ANIME SENSE</div>
          </Link>
        </div>
        <div className="nav-left">
          <NavLink to="/">
            <div className="left-tabs">HOME</div>
          </NavLink>
          <div className="left-tabs">
            <DropDownNavBar name="SHOP BY PRODUCT " />
            <ArrowDropDownIcon />
          </div>
          <div className="left-tabs">
            <DropDownNavBar type="anime" name="SHOP BY ANIME " />
            <ArrowDropDownIcon />
          </div>
          <Link to={"/products/" + "Combos"}>
            <div className="left-tabs">COMBOS</div>
          </Link>
        </div>

        <div className="nav-right">
          {AdminLoggedin && (
            <Link to="/admin">
              <div className="right-tabs">ADMIN</div>
            </Link>
          )}
          <div className="right-tabs">
            <SearchProducts />
          </div>
          <div className="right-tabs">
            <DropDownUser />
          </div>
          <Link to="/wishlist">
            <div className="right-tabs">
              <Badge badgeContent={wishlistItems.length} max={9} color="error">
                <FavoriteBorderIcon className="fheart" />
              </Badge>
            </div>
          </Link>
          <NavLink to="/cart">
            <div className="right-tabs">
              <Badge
                badgeContent={getTotalQuantity() || 0}
                max={9}
                color="error"
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </div>
          </NavLink>
          {currLocation !== null ? (
            <div className="right-tabs">{currLocation.city}</div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default NavBar;
