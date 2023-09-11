import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import { Box, Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "./TextError";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import "./Profile.css";
import Swal from "sweetalert2";
import Loading from "./Loading";

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
});

function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(true);
  const [buser, setbuser] = useState({});
  const user = useSelector((state) => state.user.user);
  document.title = "Profile";
  const fetchUserById = () => {
    axios
      .get(
        "https://anime-sense-backend-production.up.railway.app/auth/user/" +
          user.userId
      )
      .then((response) => {
        setbuser(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  useEffect(() => {
    fetchUserById();
    const intervalId = setInterval(() => {
      fetchUserById();
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [user.userId]);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const initialProfileValues = {
    firstName: buser.firstName,
    lastName: buser.lastName,
    email: buser.email,
    phoneNumber: buser.phoneNumber,
    password: "",
    dateOfBirth: buser.dateOfBirth,
  };

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post("http://localhost:8080/auth/updateUser/" + user.userId, values)
      .then((response) => {
        Swal.fire({
          title: "Successfully Updated",
          icon: "success",
          timer: 3000,
        });
      });
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="profile-container">
      <div className="profilehead">
        <h1>My Profile</h1>
        <p>
          <strong>Last Updated :</strong>{" "}
          {new Date(buser.userLastUpdated).toLocaleString()}
        </p>
      </div>
      <div className="pcenter">
        <Formik
          initialValues={initialProfileValues}
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
                sx={{ width: 400 }}
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
                sx={{ width: 400 }}
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
                sx={{ width: 400 }}
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
                sx={{ width: 400 }}
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
                sx={{ width: 400 }}
                label="New Password"
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
              <label>Birthday(optional)</label>
              <Box height={5} />
              <Field
                name="dateOfBirth"
                id="dateOfBirth"
                type="date"
                as={TextField}
                sx={{ width: 400 }}
                variant="outlined"
                color="primary"
              />
              <Box height={15} />
              <Button
                type="submit"
                sx={{ width: 400 }}
                disabled={!formik.isValid}
                variant="contained"
              >
                SAVE CHANGES
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Profile;
