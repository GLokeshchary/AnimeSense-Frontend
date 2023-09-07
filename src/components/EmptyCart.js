import React from "react";
import "./EmptyCart.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slice/userSlice";
function EmptyCart({ image, name, admin, Logout }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="emptycart">
      <div className="ecart">
        <img src={image} alt="luffy.jpg" />
        <h1>{name}</h1>
      </div>
      {admin ? null : (
        <>
          {Logout ? (
            <div onClick={handlelogout} className="eshop">
              <LogoutIcon />
              Log Out
            </div>
          ) : null}
          <Box height={20} />
          <Link to="/">
            <div className="eshop">
              <ArrowCircleLeftOutlinedIcon />
              Continue Shopping
            </div>
          </Link>
        </>
      )}
    </div>
  );
}

export default EmptyCart;
