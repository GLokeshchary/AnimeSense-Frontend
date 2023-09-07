import { Box, Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import TextError from "./TextError";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import "./SignUpForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const intialSignUpValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: 0,
  password: "",
  reEnterPassword: "",
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name Required*"),
  lastName: Yup.string().required("Last Name Required*"),
  email: Yup.string().required("Email Id Required*").email(),
  phoneNumber: Yup.string()
    .required("Phone Number is Required*")
    .matches(phoneRegExp, "Phone Number is Not Valid*"),
  password: Yup.string()
    .required("Password is Required*")
    .min(8, "Your Password is Too short"),
  reEnterPassword: Yup.string()
    .required("Please Re-Enter Password*")
    .oneOf([Yup.ref("password")], "Your Passwords must Match"),
});

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleClickShowReEnterPassword = () =>
    setShowReEnterPassword((show) => !show);
  const handleMouseDownReEnterPassword = () =>
    setShowReEnterPassword(!showReEnterPassword);
  const onSubmit = (values, formikHelpers) => {
    const RegisterRequest = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
      reEnterPassword: values.reEnterPassword,
    };
    axios
      .post("http://localhost:8080/auth/register", RegisterRequest)
      .then((response) => {
        console.log(response.data);
        if (response.data === "Email already exists in DB") {
          Swal.fire({
            icon: "error",
            title:
              '<strong className="sweetalert-title">Email Already In Use</strong>',
            text: "Try Using Another Email Id",
          });
        } else if (response.data === "Username already exists") {
          Swal.fire({
            icon: "error",
            title: "Username Already In Use",
            text: "Change either firstname or lastname",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Successfully Registered",
            confirmButtonText: "Log In",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        }
      });
    console.log(values);
  };
  return (
    <div className="signup-wrapper">
      <div className="heading">
        <h2>SIGN UP</h2>
      </div>
      <div>
        <Formik
          initialValues={intialSignUpValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => (
            <Form>
              <Field
                name="firstName"
                id="firstName"
                type="text"
                as={TextField}
                sx={{ width: 300 }}
                label="First Name"
                variant="outlined"
                color="primary"
                required
              />
              <ErrorMessage name="firstName" component={TextError} />
              <Box height={15} />
              <Field
                name="lastName"
                id="lastName"
                type="text"
                as={TextField}
                sx={{ width: 300 }}
                label="Last Name"
                variant="outlined"
                color="primary"
                required
              />
              <ErrorMessage name="lastName" component={TextError} />
              <Box height={15} />
              <Field
                name="email"
                id="email"
                type="email"
                as={TextField}
                sx={{ width: 300 }}
                label="Email"
                variant="outlined"
                color="primary"
                required
              />
              <ErrorMessage name="email" component={TextError} />
              <Box height={15} />
              <Field
                name="phoneNumber"
                id="phoneNumber"
                type="phoneNumber"
                as={TextField}
                sx={{ width: 300 }}
                label="Phone Number"
                variant="outlined"
                color="primary"
                required
              />
              <ErrorMessage name="phoneNumber" component={TextError} />
              <Box height={15} />
              <Field
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                as={TextField}
                sx={{ width: 300 }}
                label="Password"
                variant="outlined"
                color="primary"
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
              <ErrorMessage name="password" component={TextError} />
              <Box height={15} />
              <Field
                name="reEnterPassword"
                id="reEnterPassword"
                type={showReEnterPassword ? "text" : "password"}
                as={TextField}
                sx={{ width: 300 }}
                label="Re-Enter Password"
                variant="outlined"
                color="primary"
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowReEnterPassword}
                        onMouseDown={handleMouseDownReEnterPassword}
                      >
                        {showReEnterPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
              <ErrorMessage name="reEnterPassword" component={TextError} />
              <Box height={15} />
              <div className="already">
                <div>
                  <Link to="/login">
                    <span className="text">Already Have An Account?</span>
                  </Link>
                </div>
              </div>
              <Box height={20} />
              <Button
                type="submit"
                sx={{ width: 300 }}
                disabled={!formik.isValid}
                variant="contained"
              >
                SIGN UP
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUpForm;
