import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logout } from "../redux/slice/userSlice";
import axios from "axios";
import Loading from "./Loading";
import Payment from "./Payment";
import { Box, Divider } from "@mui/material";
import { URI } from "../apis/apicalls";

function BuyNowShipping() {
  const [loading, setloading] = useState(false);
  const [order, setorder] = useState({});
  const [showpayment, setshowpayment] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buynowitem = useSelector((state) => state.cart.buyNowItems) || {};
  const shippingAddress = useSelector((state) => state.address.shippingAddress);
  const user = useSelector((state) => state.user.user) || {};
  const cartItems = [];
  document.title = "Shipping";
  cartItems.push(buynowitem);
  const postAddress =
    shippingAddress.address +
    " " +
    shippingAddress.apartment +
    "" +
    shippingAddress.city +
    " " +
    shippingAddress.state +
    " " +
    shippingAddress.pincode +
    " " +
    shippingAddress.phoneNumber;
  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    totalQuantity = buynowitem.quantity;
    totalPrice = buynowitem.product.price * totalQuantity;
    return { totalQuantity, totalPrice };
  };
  const handlePayment = () => {
    const options = {
      key: "rzp_test_7YcJMBdeM9ugf2",
      key_secret: "wL7wmD1AcqIgJkrPy2wxNyTt",
      amount: getTotal().totalPrice * 100,
      currency: "INR",
      name: "AnimeSense",
      description: "Test Transaction",
      image:
        "https://cdn.vectorstock.com/i/1000x1000/77/43/letter-a-logo-icon-with-dragon-design-vector-36637743.webp",
      handler: function (response) {
        setloading(true);
        const orderrequest = {
          razorPayTransactionId: response.razorpay_payment_id,
          paymentMethod: "NETBANKING",
          shippingAddress: postAddress,
          totalOrderPrice: getTotal().totalPrice,
          amountPaid: true,
          cartItems: cartItems,
        };
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${user.jwtToken}`,
        //   },
        // };
        axios
          .post(
            URI+"/orders/create/" +
              user.userId,
            orderrequest,
            {
              headers: {
                Authorization: "Bearer " + user.jwtToken,
              },
            }
          )
          .then((response) => {
            setorder(response.data);
            setshowpayment(true);
            setloading(false);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              Swal.fire({
                title: "Session Expired Please Log In Again",
                confirmButtonText: "Login",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(logout());
                  navigate("/login");
                }
              });
            }
          });
      },
      prefill: {
        name: user.username,
        email: user.email,
        contact: user.phoneNumber,
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };
  if (loading) {
    return <Loading />;
  }
  if (showpayment) {
    return <Payment buynow={true} order={order} />;
  }
  return (
    <div className="ship-cotainer">
      <Box height={30} />
      <h4>Shipping Details</h4>
      <div className="ship-contact">
        <div className="shipc">
          <div className="shiph">Contact</div>
          <div className="informationship">
            {user.email + "," + shippingAddress.phoneNumber}
          </div>
        </div>
        <Divider />
        <div className="shipc">
          <div className="shiph">Ship to</div>
          <div className="informationship">
            {shippingAddress.apartment + " " + shippingAddress.address}
          </div>
        </div>
      </div>
      <div className="shimethod">
        <div>Shipping Method</div>
        <div className="method">
          <p>
            Delivery In "Telangana" is Available On Prepaid Orders Only due to
            local courier issues. COD order will be auto cancelled- Prepaid
          </p>
          <span>Free</span>
        </div>
      </div>
      <div className="c-continue">
        <button onClick={handlePayment}>Continue</button>
      </div>
    </div>
  );
}

export default BuyNowShipping;
