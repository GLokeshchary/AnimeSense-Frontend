import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Payment.css";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/slice/cartSlice";
function Payment({ order, buynow }) {
  const [loading, setloading] = useState(false);
  const user = useSelector((state) => state.user.user) || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  document.title = "Payment";
  const createdat = new Date(order.createdAt).toLocaleString();
  const estimatedelivery = new Date(
    order.estimatedDeliveryDate
  ).toLocaleString();
  useEffect(() => {
    emailjs.init(publickey);
  }, []);
  const orderedproducts = order.cartItems
    .map((cartItem, index) => {
      return `Product ${index + 1} : ${
        cartItem.product.productName
      },Quantity : ${cartItem.quantity},Size : ${cartItem.size}`;
    })
    .join("\n");
  console.log(orderedproducts);
  const serviceId = "service_gfqyqyu";
  const templateId = "template_lkkwol1";
  const publickey = "OGjEHT8CutkHUwt_G";

  const handleFinish = () => {
    try {
      setloading(true);
      emailjs
        .send(serviceId, templateId, {
          to_name: user.username,
          from_name: "Anime Sense",
          recipient: user.email,
          orderedproducts: orderedproducts,
          orderStatus: order.orderStatus,
          shippingAddress: order.shippingAddress,
          estimateDelivery: new Date(
            order.estimatedDeliveryDate
          ).toLocaleString(),
          totalPrice: order.totalOrderPrice,
        })
        .then((response) => console.log(response, "Success"));
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
    Swal.fire({
      title: "Arigato!!",
      text: "Thank You For Ordering !! Email has been Sent,Check Inbox",
      imageUrl:
        "https://pa1.aminoapps.com/6553/63a02555001a66b3f39dbc978fb1ee3867a794ef_00.gif",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    }).then((result) => {
      if (result.isConfirmed) {
        if (buynow) {
          navigate("/");
        } else {
          dispatch(clearCart());
          navigate("/");
        }
      }
    });
  };
  return (
    <div className="paymnet-ci">
      <div className="paymentdetails">
        <div>
          <strong>OrderId :</strong> {order.orderId}
        </div>
        <div>
          <strong>TransactionId : </strong>
          {order.razorPayTransactionId}
        </div>
        <div>
          <strong>Shipping Address: </strong>
          {order.shippingAddress}
        </div>
        <div>
          <strong>Ordered Price : </strong>
          Rs. {order.totalOrderPrice}.00
        </div>
        <div>
          <strong>Ordered Date : </strong>
          {createdat}
        </div>
        <div>
          <strong>Estimated Delivery Date : </strong>
          {estimatedelivery}
        </div>
        <div>
          <strong>PaymentMethod : </strong>
          {order.paymentMethod}
        </div>
        <div>
          <strong>AmountPaid :</strong>{" "}
          {order.amountPaid ? (
            <span>Paid</span>
          ) : (
            <span style={{ color: "red" }}>Pending</span>
          )}
        </div>
        <div className="status">
          <strong>Order Status : </strong>
          <span>{order.orderStatus}</span>
        </div>
      </div>
      <div className="b-but">
        <button onClick={handleFinish}>Finish</button>
      </div>
    </div>
  );
}

export default Payment;
