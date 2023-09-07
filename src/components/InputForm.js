import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";
import "./InputForm.css";
function InputForm(props) {
  const { label, name, type, min, max, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <div className="form-container">
        <Field
          className="fieldinput"
          type={type}
          min={min}
          max={max}
          label={label}
          id={name}
          name={name}
          variant="outlined"
          color="primary"
          required
          {...rest}
        />
        <ErrorMessage name={name} component={TextError} />
      </div>
    </div>
  );
}

export default InputForm;
