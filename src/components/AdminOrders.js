import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import "./AdminOrders.css";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { URI } from "../apis/apicalls";
function AdminOrders() {
  const [loading, setloading] = useState(true);
  const [selectedValue, setSelectedValue] = useState();
  const [orders, setorders] = useState([]);
  const [orderID, setorderID] = useState();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const shipping = "Shipping";
  const Delivered = "Delivered";
  const OnDelivery = "OnDelivery";
  document.title = "Admin/Orders";
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const fetchOrders = () => {
    axios
      .get(
        URI+"/orders/allOrders",
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
  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(() => {
      fetchOrders();
    }, 7000);
    return () => {
      clearInterval(intervalId);
    };
  }, [user.userId]);
  const updateStatus = () => {
    axios
      .post(
        URI+"/orders/status/" +
          orderID,
        selectedValue,
        {
          headers: {
            Authorization: "Bearer " + user.jwtToken,
          },
        }
      )
      .then((response) => {
        if (response.data === "Status Updated") {
          Swal.fire({
            title: "Order Status For Order Id " + orderID + " Updated",
            icon: "success",
          });
          setOpen(!open);
        }
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
  return (
    <div className="adminorders-container">
      <div className="ordersa-head">
        <h1>ORDERS</h1>
      </div>
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>razorPayTransactionId</th>
              <th>createdAt</th>
              <th>estimatedDeliveryDate</th>
              <th>totalOrderPrice</th>
              <th>orderStatus</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order.orderId}</td>
                <td>{order.razorPayTransactionId}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  {new Date(order.estimatedDeliveryDate).toLocaleString()}
                </td>
                <td>{order.totalOrderPrice}</td>
                <td className="tabledata">
                  <button
                    onClick={() => {
                      setorderID(order.orderId);
                      setOpen(!open);
                    }}
                  >
                    Update Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="modal-content">
              <h3>Update Order Status</h3>
              <div className="modal">
                <select name={selectedValue} onChange={handleSelectChange}>
                  <option value={shipping}>Shipping</option>
                  <option value={OnDelivery}>OnDelivery</option>
                  <option value={Delivered}>Delivered</option>
                </select>
                <button onClick={updateStatus}>Update Status</button>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default AdminOrders;
