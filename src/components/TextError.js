import React from "react";
import "./TextError.css"
function TextError(props) {
  return <div className="error">{props.children}</div>;
}

export default TextError;