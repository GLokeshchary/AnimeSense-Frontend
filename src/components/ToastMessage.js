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
      toast.info(message, toastOptions);
      break;
    case "top-center":
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
      break;
    default:
      toast(message, toastOptions);
      break;
  }

  return null;
};

export default ToastMessage;
