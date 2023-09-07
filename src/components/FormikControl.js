import React from "react";
import InputForm from "./InputForm";
import RadioButtonForm from "./RadioButtonForm";
import SelectForm from "./SelectAnimeName";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <InputForm {...rest} />;
    case "select":
      return <SelectForm {...rest} />;
    case "radio":
      return <RadioButtonForm {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
