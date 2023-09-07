import React from "react";
import "./Admin.css";
import EmptyCart from "./EmptyCart";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function Admin() {
  const user = useSelector((state) => state.user.user);
  const AdminLoggedIn =
    useSelector((state) => state.user.AdminLoggedIn) || false;
  document.title = "Admin";
  if (user === null) {
    return (
      <EmptyCart
        name="UnAuthorised Access!!"
        image="https://media.tenor.com/1Rie5-nbCN8AAAAC/king-of-hell-zoro-zoro-one-piece.gif"
      />
    );
  }
  return (
    <>
      {AdminLoggedIn === false ? (
        <EmptyCart
          name="Unauthorised Access"
          image="https://media.tenor.com/1Rie5-nbCN8AAAAC/king-of-hell-zoro-zoro-one-piece.gif"
        />
      ) : (
        <div className="totalConatiner">
          <div className="sidenavbar">
            <div className="adminname">
              <div>{user.username}</div>
              <div className="small">{user.email}</div>
            </div>
            <div className="navlinks">
              <div className="items-side">
                <Link to="/admin/dashboard">
                  <div className="sidenavlink">DASHBOARD</div>
                </Link>
                <Link to="/admin/a-products">
                  {" "}
                  <div className="sidenavlink">PRODUCTS</div>
                </Link>
                <Link to="/admin/saveProduct">
                  <div className="sidenavlink">ADD NEW PRODUCT</div>
                </Link>
                <Link to="/admin/a-orders">
                  <div className="sidenavlink">ORDERS</div>
                </Link>
                <Link to="/admin/customers">
                  <div className="sidenavlink">CUSTOMERS</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="admin-content">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
