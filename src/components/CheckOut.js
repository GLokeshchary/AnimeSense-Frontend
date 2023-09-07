import React from "react";
import { Badge, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import "./CheckOut.css";
import { Outlet, useLocation } from "react-router-dom";
import EmptyCart from "./EmptyCart";
function CheckOut() {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const LoggedIn = useSelector((state) => state.user.LoggedIn) || false;
  document.title = "CheckOut";
  if (!LoggedIn) {
    return (
      <EmptyCart
        image="https://qph.cf2.quoracdn.net/main-qimg-accb5553570150f4b4dd4b6a0fee9f77"
        name="PERMISSION DENIED!! PLEASE LOG IN"
      />
    );
  }
  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.product.price * item.quantity;
    });
    return { totalQuantity, totalPrice };
  };
  return (
    <div className="check-out-container">
      <div className="subcomponent">
        <Outlet />
      </div>
      <div className="check-cart">
        <div className="secondpart">
          {cartItems.map((item, id) => (
            <div key={id} className="c-container">
              <Badge badgeContent={item.quantity} color="error">
                <div className="c-ig">
                  <img src={item.product.imageUrls[0]} alt={id} />
                </div>
              </Badge>
              <div className="c-details">
                <span>{item.product.productName}</span>
                {item.product.productCategory === "Bags" ||
                item.product.productCategory === "Caps" ||
                item.product.productCategory === "Posters" ||
                item.product.productCategory === "Stickers" ? null : (
                  <span>Size : {item.size}</span>
                )}
              </div>
              <p className="check-price">Rs. {item.product.price}.00</p>
            </div>
          ))}
        </div>
        <div className="downpart">
          <Divider />
          <div className="csubtotal">
            <span>SubTotal</span>
            <span className="check">Rs. {getTotal().totalPrice}.00</span>
          </div>
          <div className="csubtotal">
            <span>Shipping</span>
            <span className="check">Free</span>
          </div>
          <Divider />
          <div className="csubtotal">
            <span className="s-total">Total</span>
            <span className="inr">
              <p>INR</p> <span>Rs. {getTotal().totalPrice}.00</span>{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
