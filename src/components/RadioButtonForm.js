import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";
import "./RadioButtonForm.css";
function RadioButtonForm(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="radio">
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                  type="radio"
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default RadioButtonForm;
