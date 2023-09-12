import React, { useEffect, useState } from "react";
import "./AdminDashBoard.css";
import Loading from "./Loading";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import OrdersChart from "./OrdersChart";
function AdminDashBoard() {
  const [loading, setloading] = useState(true);
  const [orders, setorders] = useState([]);
  const [users, setusers] = useState([]);
  const [data, setdata] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user) || {};
  const fetchOrders = () => {
    axios
      .get(
        "https://anime-sense-backend-production.up.railway.app/orders/allOrders",
        {
          headers: {
            Authorization: "Bearer " + user.jwtToken,
          },
        }
      )
      .then((response) => {
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
  };
  const fetchOrdersByDate = () => {
    axios
      .get(
        "https://anime-sense-backend-production.up.railway.app/orders/chart",
        {
          headers: {
            Authorization: "Bearer " + user.jwtToken,
          },
        }
      )
      .then((response) => {
        setdata(response.data);
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
  };
  const fetchAllUsers = () => {
    axios
      .get("https://anime-sense-backend-production.up.railway.app/auth/all")
      .then((response) => {
        setusers(response.data);
        setloading(false);
      });
  };
  useEffect(() => {
    fetchAllUsers();
    fetchOrders();
    fetchOrdersByDate();
    const intervalId = setInterval(() => {
      fetchOrders();
      fetchOrdersByDate();
    }, 6000);
    return () => clearInterval(intervalId);
  }, [user.userId]);

  const totalAmount = () => {
    let total = 0;
    orders.forEach((order) => {
      total += order.totalOrderPrice;
    });
    return total;
  };
  if (user === null) {
    return (
      <EmptyCart
        name="Unauthorised Access"
        image="https://media.tenor.com/1Rie5-nbCN8AAAAC/king-of-hell-zoro-zoro-one-piece.gif"
      />
    );
  }
  if (orders === null) {
    return (
      <EmptyCart
        image="https://gifdb.com/images/high/demon-slayer-tanjiro-kamado-sad-crying-i53cv2i9006fzmyi.gif"
        name="No Orders Yet"
      />
    );
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboardconainer">
      <h1>DASHBOARD</h1>
      <div className="earings">
        <div className="earbuttons">
          <button>
            Earnings : <span>{"Rs." + totalAmount()}</span>
          </button>
          <button>
            Orders : <span>{orders.length}</span>
          </button>
          <button>
            Customers : <span>{users.length}</span>
          </button>
        </div>
      </div>
      <div>
        <OrdersChart data={data} />
      </div>
    </div>
  );
}

export default AdminDashBoard;
