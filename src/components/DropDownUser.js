import React from "react";
import "./DropDownUser.css";

import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/userSlice";
import Swal from "sweetalert2";
function DropDownUser() {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.user.LoggedIn) || false;
  const user = useSelector((state) => state.user.user) || {};
  const handleLogout = () => {
    disptach(logout());
    Swal.fire({
      icon: "success",
      title: "Successfully Logged Out!",
      showConfirmButton: true,
    });
    navigate("/");
  };
  return (
    <div>
      <div className="dropdown2">
        <div className="dropbtn2">
          <PersonIcon />
        </div>
        <div className="dropdown-content2">
          {!loggedIn ? (
            <div className="nav-login">
              <Link to="/login">
                <button>LOGIN</button>
              </Link>
              <p>
                NEW USER ? <Link to="/register">REGISTER HERE</Link>
              </p>
            </div>
          ) : (
            <div className="userlist">
              <div className="navaccount">
                Hi,{"  "}
                {user.firstName}
              </div>
              <div
                onClick={() => {
                  navigate("/account");
                }}
                className="navhover"
              >
                My Account
              </div>
              <div
                className="navhover"
                onClick={() => {
                  navigate("/account");
                }}
              >
                My Orders
              </div>
              <div
                className="navhover"
                onClick={() => {
                  navigate("/wishlist");
                }}
              >
                My WishList
              </div>
              <div onClick={handleLogout} className="navhover">
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DropDownUser;
