import React from "react";
import "./Wishlist.css";
import Card from "./Card";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { clearWishList, removewishlist } from "../redux/slice/wishlistSlice";
import EmptyCart from "./EmptyCart";
import ToastMessage from "./ToastMessage";
function Wishlist() {
  const wishlistItems =
    useSelector((state) => state.wishlist.wishlistItems) || [];
  const dispatch = useDispatch();
  document.title = "WishList";
  const wishlist = true;
  const wishimage =
    "https://pa1.aminoapps.com/6146/31896a5e6e3b7582c73bc5aa6c9150ead9df1d5a_hq.gif";
  if (wishlistItems.length === 0) {
    return <EmptyCart name="Your WishList is Empty" image={wishimage} />;
  }
  return (
    <div className="w-container">
      <div className="whead">Your WishList</div>
      <div className="reset">
        <button onClick={() => dispatch(clearWishList())}>
          <ClearOutlinedIcon /> Clear All
        </button>
      </div>
      <div className="wishlist-items">
        {wishlistItems?.map((item, id) => (
          <div key={id}>
            <Card product={item.product} wishlistitem={wishlist} />
            <div className="wc">
              <button
                onClick={() => {
                  dispatch(removewishlist(item.product.productId));
                  ToastMessage({
                    type: "info",
                    image:
                      "https://media.tenor.com/t2cnacC8w7oAAAAC/one-piece-anime.gif",
                    message: `Removed from  Wishlist cart`,
                  });
                }}
              >
                <CancelIcon className="wishcancel" />
                Remove From WishList
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
