import React, { useState } from "react";

import * as Yup from "yup";
import "./Address.css";
import { Form, Formik } from "formik";
import FormikControl from "./FormikControl";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../redux/slice/addressSlice";
import { Link } from "react-router-dom";

const indianStates = [
  { key: "select your state", value: " " },
  { key: "Andhra Pradesh", value: "Andhra Pradesh" },
  { key: "Arunachal Pradesh", value: "Arunachal Pradesh" },
  { key: "Assam", value: "Assam" },
  { key: "Bihar", value: "Bihar" },
  { key: "Chhattisgarh", value: "Chhattisgarh" },
  { key: "Goa", value: "Goa" },
  { key: "Gujarat", value: "Gujarat" },
  { key: "Haryana", value: "Haryana" },
  { key: "Himachal Pradesh", value: "Himachal Pradesh" },
  { key: "Jharkhand", value: "Jharkhand" },
  { key: "Karnataka", value: "Karnataka" },
  { key: "Kerala", value: "Kerala" },
  { key: "Madhya Pradesh", value: "Madhya Pradesh" },
  { key: "Maharashtra", value: "Maharashtra" },
  { key: "Manipur", value: "Manipur" },
  { key: "Meghalaya", value: "Meghalaya" },
  { key: "Mizoram", value: "Mizoram" },
  { key: "Odisha", value: "Odisha" },
  { key: "Punjab", value: "Punjab" },
  { key: "Rajasthan", value: "Rajasthan" },
  { key: "Sikkim", value: "Sikkim" },
  { key: "Tamil Nadu", value: "Tamil Nadu" },
  { key: "Telangana", value: "Telangana" },
  { key: "Tripura", value: "Tripura" },
  { key: "Uttar Pradesh", value: "Uttar Pradesh" },
  { key: "Uttarakhand", value: "Uttarakhand" },
  { key: "West Bengal", value: "West Bengal" },
  { key: "Chandigarh", value: "Chandigarh" },
  { key: "Delhi", value: "Delhi" },
  { key: "Puducherry", value: "Puducherry" },
];
const validationSchema = Yup.object({
  country: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  apartment: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  pincode: Yup.number().required("Required").min(6),
  phoneNumber: Yup.number().required("Required").min(10),
});

function Address({ buynow }) {
  const [showaddress, setshowaddress] = useState(false);
  const user = useSelector((state) => state.user.user) || {};
  const dispatch = useDispatch();
  const intialInformationValues = {
    country: "India",
    firstName: user.firstName,
    lastName: user.lastName,
    address: "",
    apartment: "",
    city: "Hyderabad",
    state: "",
    pincode: 0,
    phoneNumber: 0,
  };
  const onSubmit = (values, formikHelpers) => {
    dispatch(addAddress(values));
    setshowaddress(!showaddress);
    formikHelpers.resetForm();
  };
  if (showaddress) {
    return (
      <div className="saddress">
        Your Shipping Address Has Been Saved.
        <p>Please Click On Continue For Further Process!</p>
        <div className="c-continue">
          {buynow ? (
            <Link to="/bcheckout/bshipping">
              <button>Continue</button>
            </Link>
          ) : (
            <Link to="/checkout/shipping">
              <button>Continue</button>
            </Link>
          )}
        </div>
      </div>
    );
  }
  return (
    <div>
      <Formik
        initialValues={intialInformationValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => (
          <Form>
            <div className="control">
              <FormikControl
                control="input"
                label="Country : "
                name="country"
                type="text"
              />
            </div>
            <div className="control">
              <FormikControl
                control="input"
                label="First Name : "
                name="firstName"
                type="text"
              />
              <FormikControl
                control="input"
                label="Last Name : "
                name="lastName"
                type="text"
              />
            </div>
            <div className="control">
              <FormikControl
                control="input"
                label="Address : "
                name="address"
                type="text"
              />
            </div>
            <div className="control">
              <FormikControl
                control="input"
                label="Apartment,suite, etc. : "
                name="apartment"
              />
            </div>
            <div className="control">
              <FormikControl control="input" label="City : " name="city" />
            </div>
            <div className="control">
              <FormikControl
                control="select"
                label="State : "
                name="state"
                options={indianStates}
              />
            </div>
            <div className="control">
              <FormikControl
                control="input"
                type="number"
                min="6"
                label="Pin Code : "
                name="pincode"
              />
            </div>
            <div className="control">
              <FormikControl
                control="input"
                type="number"
                min="10"
                label="Phone : "
                name="phoneNumber"
              />
            </div>
            <div className="control">
              <button type="submit" disabled={!formik.isValid}>
                submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Address;
