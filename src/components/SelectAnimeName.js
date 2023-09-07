import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

function SelectForm(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field
        className="optionop"
        label={label}
        as="select"
        id={name}
        name={name}
        {...rest}
      >
        {options.map((option) => {
          return (
            <option
              className="optionvalues"
              key={option.value}
              value={option.value}
            >
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default SelectForm;
