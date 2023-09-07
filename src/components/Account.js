import React from "react";
import "./Account.css";
import { Outlet, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import NewlyLaunched from "./NewlyLaunched";
function Account() {
  const loggedIn = useSelector((state) => state.user.LoggedIn) || false;
  const navigate = useNavigate();
  if (!loggedIn) {
    return (
      <EmptyCart
        image="https://media.tenor.com/B_U69Q8sALgAAAAC/one-piece-no.gif"
        name="Access Denied !! LOG IN TO ACCESS"
      />
    );
  }
  return (
    <div className="account-cotainer">
      <h1>My Account</h1>
      <div className="buttoncontainer">
        {" "}
        <button
          onClick={() => {
            navigate("/account/orders");
          }}
        >
          My Orders
        </button>
        <button
          onClick={() => {
            navigate("/cart");
          }}
        >
          My Cart
        </button>
        <button
          onClick={() => {
            navigate("/wishlist");
          }}
        >
          My WishList
        </button>
        <button
          onClick={() => {
            navigate("/account/profile");
          }}
        >
          My Profile
        </button>
      </div>
      <div>
        <Divider />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <NewlyLaunched name="TRENDING" />
      </div>
    </div>
  );
}

export default Account;
