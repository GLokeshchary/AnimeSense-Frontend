import React from "react";
import SignUpForm from "../components/SignUpForm";
import "./SignUpPage.css";
function SignupPage() {
  document.title = "Register";
  return (
    <div className="signuppage-container">
      <div className="right">
        <div className="welcometext">
          <h3>Kon'nichiwa, min'na :)</h3>
          <span className="heading2">Welcome To Our World</span>
        </div>
        <div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
