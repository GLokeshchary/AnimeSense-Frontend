import React from "react";
import "./Information.css";
import Address from "./Address";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import { logout } from "../redux/slice/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
function Information() {
  const user = useSelector((state) => state.user.user) || {};
  const LoggedIn = useSelector((state) => state.user.LoggedIn) || false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  document.title = "Information";
  const data = location.state;
  return (
    <div className="information-container">
      <Box height={20} />
      <div className="conatct">
        <span className="infoheader">Contact</span>
        <div className="infop">
          <img
            src="https://www.fansarmy.in/cdn/shop/products/67_800x.jpg?v=1667641318"
            alt=""
          />
          <div className="infodetails">
            <span className="pname">
              {user.firstName + " " + user.lastName}
            </span>
            <span
              className="red"
              on
              onClick={() => {
                dispatch(logout());
                navigate(-1);
              }}
            >
              Log Out
            </span>
          </div>
        </div>
      </div>
      <div className="shipping">
        <span className="infoheader">Shipping address</span>
        <Box height={20} />
        <Address buynow={data} />
      </div>
    </div>
  );
}

export default Information;
