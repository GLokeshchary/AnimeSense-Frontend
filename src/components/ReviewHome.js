import { Pagination, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ReviewHome.css";
import axios from "axios";
import { URI } from "../apis/apicalls";
function ReviewHome() {
  const [reviews, setreviews] = useState([]);
  const [page, setPage] = useState(1);
  const [reviewLength, setreviewLength] = useState(0);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const reviewsPerPage = 5;
  const startIndex = (page - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const paginatedReviews = reviews.slice(startIndex, endIndex);
  useEffect(() => {
    axios
      .get(URI+"/reviews/all")
      .then((response) => {
        setreviewLength(response.data.length);
        setreviews(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="review-container">
      <div className="review-header">
        <span>Review From Our Otaku's</span>
        <Rating value={5} size="small" readOnly />
        <strong>from {reviewLength} reviews</strong>
      </div>
      <div className="allreviewscotainer">
        {paginatedReviews.map((review, i) => (
          <div key={i} className="review">
            <img src={review.reviewProductImage} />
            <div className="review-details">
              <div className="r-rting">
                <Rating
                  value={review.rating}
                  size="small"
                  color="error"
                  readOnly
                />
              </div>
              <strong>{review.reviewTitle}</strong>
              <div className="comment">
                <p>{review.reviewComments.substring(0, 60) + "..."}</p>
              </div>
              <span>{review.reviewerName}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination
          count={Math.ceil(reviews.length / reviewsPerPage)}
          page={page}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          size="large"
          color="primary"
        />
      </div>
      <br />
    </div>
  );
}

export default ReviewHome;
