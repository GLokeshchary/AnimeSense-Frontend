import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./Cart.css";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useSelector } from "react-redux";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../redux/slice/cartSlice";
import EmptyCart from "./EmptyCart";
import ToastMessage from "./ToastMessage";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const LoggedIn = useSelector((state) => state.user.LoggedIn) || false;
  const navigate = useNavigate();
  document.title = "Cart";
  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.product.price * item.quantity;
    });
    return { totalQuantity, totalPrice };
  };
  const dispatch = useDispatch();
  const checkout = () => {
    if (LoggedIn) {
      navigate("/checkout");
    } else {
      Swal.fire({
        icon: "question",
        title: "Please Login To Proceed",
        confirmButtonText: "Log In",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  if (cartItems.length === 0) {
    return (
      <EmptyCart
        image="https://media.tenor.com/cu7EJBpK6rQAAAAC/luffy-smiling.gif"
        name="Your Cart is Empty"
      />
    );
  }
  return (
    <>
      <div className="carthead">Your Cart</div>
      <div className="cart-container">
        <div className="ptable">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => {
                return (
                  <tr className="cartpdetails" key={index}>
                    <td>
                      <button
                        key={index}
                        className="deleteicon"
                        onClick={() => {
                          dispatch(removeItem(item.product.productId));
                          ToastMessage({
                            type: "info",
                            image:
                              "https://66.media.tumblr.com/4f9e85d9bf78ceaaf2f44de3e90e735a/03a6876b96c16cda-b0/s540x810/0f93acc54f06ba7268a4b031cc5d6f90381a08a5.gif",
                            message: `${item.product.productName} Deleted From cart`,
                          });
                        }}
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </td>

                    <td className="pp-product">
                      <Link to={"product/" + item.product.productId}>
                        <img
                          src={item.product.imageUrls[0]}
                          alt={item.product.productId}
                        />
                      </Link>
                      <div className="details">
                        <p>{item.product.productName}</p>
                        {item.product.productCategory === "Bags" ||
                        item.product.productCategory === "Caps" ||
                        item.product.productCategory === "Posters" ||
                        item.product.productCategory === "Stickers" ? null : (
                          <p>Size : {item.size}</p>
                        )}
                      </div>
                    </td>

                    <td>Rs {item.product.price}</td>
                    <td className="pquantity">
                      <button
                        className="bq"
                        onClick={() =>
                          dispatch(decrementQuantity(item.product.productId))
                        }
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="bq"
                        onClick={() =>
                          dispatch(incrementQuantity(item.product.productId))
                        }
                      >
                        +
                      </button>
                    </td>
                    <td>Rs. {item.quantity * item.product.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="other">
          <Link to="/">
            <div className="cshop">
              <ArrowCircleLeftOutlinedIcon />
              Continue Shopping
            </div>
          </Link>
          <div className="reset">
            <button onClick={() => dispatch(clearCart())}>
              <ClearOutlinedIcon /> Clear Cart
            </button>
          </div>
        </div>
        <div className="subtotal">
          <div className="special">
            <span>SPECIAL INSTRUCTIONS FOR SELLER WITH YOUR ORDER</span>
            <textarea rows="4" cols="50"></textarea>
          </div>
          <div className="sub">
            <div className="ssub">
              <div>
                <h4>SUB TOTAL </h4>
              </div>
              <div>
                <h4>Rs. {getTotal().totalPrice}</h4>
              </div>
            </div>
            <div className="ssub">
              <span>Total Quantity</span>
              <span>{getTotal().totalQuantity}</span>
            </div>
            <button onClick={checkout} className="proceed">
              PROCEED TO CHECK OUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
