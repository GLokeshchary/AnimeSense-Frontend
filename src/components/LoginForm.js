import React, { useState } from "react";
import { ErrorMessage, Form, Field, Formik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import TextError from "./TextError";
import * as Yup from "yup";
import "./LoginForm.css";
import axios from "axios";
import ToastMessage from "./ToastMessage";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { addUser } from "../redux/slice/userSlice";
import Loading from "./Loading";

const initialLoginValues = {
  username: "",
  password: "",
};
const validationSchema = Yup.object({
  username: Yup.string().required("username is requried*"),
  password: Yup.string().required("Password required*"),
});

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values, formikHelpers) => {
    setloading(true);
    const authRequest = {
      username: values.username,
      password: values.password,
    };
    axios
      .post(
        "https://anime-sense-backend-production.up.railway.app/auth/authenticate",
        authRequest
      )
      .then((response) => {
        if (
          response.data.loginMessage === "Logged In Successfully" &&
          response.data.jwtToken !== null
        ) {
          dispatch(addUser(response.data));
          setloading(false);
          formikHelpers.resetForm();
          ToastMessage({
            type: "info",
            image:
              "https://i.pinimg.com/originals/53/61/a7/5361a7115f1dedb3c8f01a3dcf45bb30.gif",
            message: `LoggedIn SucessFully`,
          });
          navigate("/");
        } else if (
          response.data.loginMessage === "Invalid Username" &&
          response.data.jwtToken === null
        ) {
          setloading(false);
          ToastMessage({
            type: "info",
            image: "https://media.tenor.com/Ya4dusE_LZ0AAAAC/anime-stress.gif",
            message: `${response.data.loginMessage}`,
          });
        } else {
          setloading(false);
          ToastMessage({
            type: "info",
            image: "https://media.tenor.com/Ya4dusE_LZ0AAAAC/anime-stress.gif",
            message: `${response.data.loginMessage}`,
          });
        }
      });
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div>
          <h2>LOG IN</h2>
        </div>
        <Formik
          initialValues={initialLoginValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => (
            <Form>
              <Field
                name="username"
                id="username"
                type="text"
                as={TextField}
                sx={{ width: 300 }}
                label="Username"
                variant="outlined"
                color="primary"
                required
              />
              <ErrorMessage
                className="errormessage"
                name="username"
                component={TextError}
              />
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
              <ErrorMessage
                className="errormessage"
                name="password"
                component={TextError}
              />
              <Box height={15} />
              <div className="remember-me">
                <div className="remeber">
                  <input type="checkbox" />
                  <span className="text">Remember Me</span>
                </div>
              </div>
              <Box height={20} />
              <Button
                type="submit"
                sx={{ width: 300 }}
                disabled={!formik.isValid}
                variant="contained"
              >
                SIGN IN
              </Button>
              <div className="lregister">
                <span>
                  NEW USER |{" "}
                  <Link to="/register">
                    <span className="loginregister">REGISTER</span>
                  </Link>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;
