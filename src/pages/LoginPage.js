import React from "react";
import "./LoginPage.css";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import EmptyCart from "../components/EmptyCart";

function LoginPage() {
  const loggedIn = useSelector((state) => state.user.LoggedIn) || false;
  document.title = "Login";
  if (loggedIn) {
    return (
      <EmptyCart
        Logout={true}
        name="Already Logged In"
        image="https://media.tenor.com/9wsIC8hWKNQAAAAd/one-piece.gif"
      />
    );
  }
  return (
    <div className="login-container">
      <div className="form">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
