import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { logout } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "@mui/material";
import "./Orders.css";
import Swal from "sweetalert2";
import EmptyCart from "./EmptyCart";
function Orders() {
  const [loading, setloading] = useState(true);
  const [orders, setorders] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  document.title = "Orders";
  useEffect(() => {
    axios
      .get(
        "https://anime-sense-backend-production.up.railway.app/orders/all/" +
          user.userId,
        {
          headers: {
            Authorization: "Bearer " + user.jwtToken,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const filterorders = response.data
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setorders(filterorders);
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
  }, [user.userId]);
  if (orders === null) {
    return (
      <EmptyCart
        image="https://gifdb.com/images/high/demon-slayer-tanjiro-kamado-sad-crying-i53cv2i9006fzmyi.gif"
        name="Sadly, you haven't placed any orders till now"
      />
    );
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="total-container">
      <h1 className="text-center">Orders</h1>
      <div>Recent</div>
      <br />
      <div className="oooooo">
        {orders.map((order, i) => (
          <div key={i} className="order-container">
            <div className="left">
              <div className="left-items">
                <span>OrderId : </span>
                <div>{order.orderId}</div>
              </div>
              <div className="left-items">
                <span>TransactionId : </span>
                <div>{order.razorPayTransactionId}</div>
              </div>
              <div className="left-items">
                <span>Shipping Address : </span>
                <div>{order.shippingAddress}</div>
              </div>
              <div className="left-items">
                <span>Order Status : </span>
                <div>{order.orderStatus}</div>
              </div>
              <div className="left-items">
                <span>Ordered Date : </span>
                <div>{new Date(order.createdAt).toLocaleString()}</div>
              </div>
              <div className="left-items">
                <span>Delivery Date : </span>
                <div>
                  {new Date(order.estimatedDeliveryDate).toLocaleString()}
                </div>
              </div>
              <div className="left-items">
                <span>Total Amount : </span>
                <div>{order.totalOrderPrice}</div>
              </div>
            </div>
            <div className="righ">
              <div className="image-continaer">
                {order.cartItems.map((cartitem, j) => (
                  <div key={j} className="image0">
                    <Badge color="error" badgeContent={cartitem.quantity}>
                      <img src={cartitem.product.imageUrls[0]} />
                    </Badge>
                    <div className="pd">
                      <span>Size : {cartitem.size}</span>
                      <span>price : {cartitem.product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
