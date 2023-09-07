import React from "react";
import { toast } from "react-toastify";
import "./ToastMessage.css";
const ToastMessage = ({ type, message, image }) => {
  const toastOptions = {
    position: "top-right",
    autoClose: 3000, // Automatically close after 2 seconds
  };

  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "info":
      toast.info(
        <div className="toastwish">
          <img src={image} alt="Custom Image" />
          <span>{message}</span>
        </div>,
        toastOptions
      );
      break;
    default:
      toast(message, toastOptions);
      break;
  }

  return null;
};

export default ToastMessage;
