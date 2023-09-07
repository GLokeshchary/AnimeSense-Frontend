import React, { useState } from "react";
import Information from "./Information";
import { Stepper, Step, StepButton, Badge, Divider } from "@mui/material";
import Shipping from "./Shipping";
import Payment from "./Payment";
import "./MultiStepper.css";
import { useSelector } from "react-redux";
const steps = ["Information", "Shipping", "Payment"];

function MultiStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.product.price * item.quantity;
    });
    return { totalQuantity, totalPrice };
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <div className="checkout-container">
      <div className="stepper-container">
        <div className="stepper">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} onClick={handleStep}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </div>
        <div>
          {activeStep === 0 && <Information activeStep={activeStep} />}
          {activeStep === 1 && <Shipping activeStep={activeStep} />}
          {activeStep === 2 && (
            <Payment
              activeStep={activeStep}
              totalPrice={getTotal().totalPrice}
            />
          )}
        </div>
      </div>
      <div className="check-cart">
        <div className="secondpart">
          {cartItems.map((item, id) => (
            <div key={id} className="c-container">
              <Badge badgeContent={item.quantity} color="error">
                <div className="c-ig">
                  <img src={item.product.imageUrls[0]} alt={id} />
                </div>
              </Badge>
              <div className="c-details">
                <span>{item.product.productName}</span>
                <span>Size : {item.size}</span>
              </div>
              <p className="check-price">Rs. {item.product.price}.00</p>
            </div>
          ))}
        </div>
        <div className="downpart">
          <Divider />
          <div className="csubtotal">
            <span>SubTotal</span>
            <span className="check">Rs. {getTotal().totalPrice}.00</span>
          </div>
          <div className="csubtotal">
            <span>Shipping</span>
            <span className="check">Free</span>
          </div>
          <Divider />
          <div className="csubtotal">
            <span className="s-total">Total</span>
            <span className="inr">
              <p>INR</p> <span>Rs. {getTotal().totalPrice}.00</span>{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiStepper;
