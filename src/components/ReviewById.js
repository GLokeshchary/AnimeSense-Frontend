import { Avatar, Box, Rating, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import TextError from "./TextError";
import "./ReviewById.css";
import axios from "axios";
import ToastMessage from "./ToastMessage";
import Loading from "./Loading";
const initalreviewvalues = {
  reviewerName: "",
  email: "",
  rating: 0,
  reviewTitle: "",
  reviewComments: "",
};
const validationSchema = Yup.object({
  reviewerName: Yup.string().required("required"),
  email: Yup.string().email().required("Required"),
  rating: Yup.number().max(5).required("Required"),
  reviewTitle: Yup.string().required("Required"),
  reviewComments: Yup.string().required("Required"),
});

function ReviewById({ productId }) {
  const [open, setopen] = useState(false);
  const [reviews, setreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchReviews = () => {
    axios
      .get(
        "https://anime-sense-backend-production.up.railway.app/reviews/" +
          productId
      )
      .then((response) => {
        if (response.data === null) {
          setreviews(null);
          setLoading(false);
        } else {
          setreviews(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchReviews();
    const intervalId = setInterval(() => {
      fetchReviews();
    }, 2000);
    return () => clearInterval(intervalId);
  }, [productId]);

  const onSubmit = (values, formikHelpers) => {
    console.log(values);
    setLoading(true);
    axios
      .post("http://localhost:8080/reviews/save/" + productId, values)
      .then((response) => {
        if (response.data.includes("Successfully")) {
          setLoading(false);
          ToastMessage({
            type: "info",
            image:
              "https://pa1.aminoapps.com/6273/4f19236b34c1042e87764cb6c7b5d8b6f34e02c5_00.gif",
            message: "Succesfully Reviewed",
          });
          formikHelpers.resetForm();
          setopen(false);
        }
      });
  };
  const formatteddate = (reviewdate) => {
    var date = new Date(reviewdate).toLocaleDateString();
    return date;
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="review-s-container">
      <div className="first">
        <span>Customer Reviews</span>
        {open ? (
          <button onClick={() => setopen(!open)}>Cancel</button>
        ) : (
          <button onClick={() => setopen(!open)}>Write a review</button>
        )}
      </div>
      <div className="based">
        <Rating value={5} readOnly color="error" />
        {reviews.length === 0 ? null : (
          <span>Based on {reviews.length} reviews</span>
        )}
      </div>
      {open && (
        <div className="review-form">
          <Formik
            initialValues={initalreviewvalues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => (
              <Form>
                <Field
                  name="reviewerName"
                  id="usereviewerNamername"
                  type="text"
                  as={TextField}
                  label="Name (public)"
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                  required
                />
                <ErrorMessage
                  className="errormessage"
                  name="reviewerName"
                  component={TextError}
                />
                <Box height={15} />
                <Field
                  name="email"
                  id="email"
                  type="text"
                  as={TextField}
                  label="Email (private)"
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                  required
                />
                <ErrorMessage
                  className="errormessage"
                  name="email"
                  component={TextError}
                />
                <Box height={15} />
                <div className="eee">
                  <span>Rating</span>
                  <Rating
                    style={{ fontSize: "24px" }}
                    name="rating"
                    value={formik.values.rating}
                    onChange={(event, newValue) => {
                      formik.setFieldValue("rating", newValue);
                    }}
                    size="large"
                  />
                </div>
                <ErrorMessage
                  className="errormessage"
                  name="rating"
                  component={TextError}
                />
                <Box height={15} />
                <Field
                  name="reviewTitle"
                  id="reviewTitle"
                  type="text"
                  as={TextField}
                  label="Review Title"
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                  required
                />
                <ErrorMessage
                  className="errormessage"
                  name="reviewTitle"
                  component={TextError}
                />
                <Box height={15} />
                <span>Review Comments</span>
                <textarea
                  rows={4}
                  name="reviewComments"
                  id="reviewComments"
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="write your comments here"
                  value={formik.values.reviewComments}
                  onChange={formik.handleChange}
                />
                <ErrorMessage
                  className="errormessage"
                  name="reviewComments"
                  component={TextError}
                />
                <div className="submit">
                  <button type="submit" disabled={!formik.isValid}>
                    SUBMIT REVIEW
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
      <div>
        {!reviews.length ? (
          <div className="noreviews">no Reviews Found</div>
        ) : (
          <div>
            {reviews.map((review, inex) => (
              <div key={inex} className="cus-review">
                <div className="avatar">
                  <Avatar>{review.reviewerName.substring(0, 1)}</Avatar>
                  <div className="firsthead">
                    <div className="ddd">
                      <Rating value={review.rating} />
                      <div>{formatteddate(review.reviewCreatedAt)}</div>
                    </div>
                    <strong>{review.reviewerName}</strong>
                  </div>
                </div>
                <p>{review.reviewComments}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewById;
