import "./Card.css";
import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import { addtoCart } from "../redux/slice/cartSlice";
import { addtoWishlist, removewishlist } from "../redux/slice/wishlistSlice";
import "react-toastify/dist/ReactToastify.css";
import ToastMessage from "./ToastMessage";
import { Box } from "@mui/material";

const sizes = ["S", "M", "L", "XL", "XXL"];
const shoeSizes = ["7", "8", "9", "10", "11"];

function Card({ product, wishlistitem }) {
  const [size, setSize] = useState(() => {
    if (product.productCategory === "Shoes") {
      return shoeSizes[0];
    } else {
      return sizes[0];
    }
  });
  const [showcart, setshowcart] = useState(false);
  const [quantity, setquantity] = useState(1);
  const wishlistItems =
    useSelector((state) => state.wishlist.wishlistItems) || [];
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const dispatch = useDispatch();
  const id = product.productId;
  const wishtrue = wishlistItems.find((item) => item.id === product.productId);
  const otherthansgoesandapprals =
    product.productCategory === "Bags" ||
    product.productCategory === "Caps" ||
    product.productCategory === "Posters" ||
    product.productCategory === "Stickers";

  const handleAddtoCart = () => {
    dispatch(addtoCart({ product, quantity, size, id }));
    setshowcart(!showcart);
    const carttrue = cartItems.find((item) => item.id === product.productId);
    if (carttrue) {
      ToastMessage({
        type: "info",
        image:
          "https://media.tenor.com/EbVjc7sjMucAAAAd/attack-on-titan-aot.gif",
        message: `${product.productName} already in cart`,
      });
    } else {
      ToastMessage({
        type: "info",
        image: "https://media.tenor.com/awdwRkbJzCgAAAAC/goku.gif",
        message: `${product.productName} added to cart`,
      });
    }
  };
  const handleWishlist = () => {
    dispatch(addtoWishlist({ product, id }));
    ToastMessage({
      type: "info",
      image: "https://media.tenor.com/O6hPzBhGmJcAAAAC/sanji-sanji-simp.gif",
      message: `${product.productName} in Wishlist cart`,
    });
  };
  const handleNotWishList = () => {
    dispatch(removewishlist(product.productId));
    ToastMessage({
      type: "info",
      image: "https://media.tenor.com/t2cnacC8w7oAAAAC/one-piece-anime.gif",
      message: `Removed from  Wishlist cart`,
    });
  };

  return (
    <div className="card-container">
      <div className="image-container">
        {product.productSpecification === "None" ||
        product.productSpecification === "Best Seller" ? null : (
          <span className="isnew">{product.productSpecification}</span>
        )}
        <Link to={`product/${id}`}>
          <img
            className="mainimage"
            src={product.imageUrls[0]}
            alt={product.productName}
          />

          <img
            className="secondimage"
            src={product.imageUrls[1]}
            alt={product.productName}
          />
        </Link>
        <div className="addtocart">
          {!wishtrue ? (
            <button onClick={handleWishlist} className="carticons">
              <FavoriteBorderOutlinedIcon />
            </button>
          ) : (
            <button onClick={handleNotWishList} className="carticons heart">
              <FavoriteIcon />
            </button>
          )}
          <button
            onClick={() => setshowcart(!showcart)}
            className="carticons cart"
          >
            <ShoppingCartOutlinedIcon />
          </button>
        </div>
      </div>
      {showcart &&
        (!wishlistitem ? (
          <div className="addtocartcard">
            <CancelIcon
              className="cancel"
              onClick={() => setshowcart(!showcart)}
            />
            <h4 className="centre">{product.productName}</h4>
            <div className="price2">
              <span className="carddetails cuttext">Rs.{product.oldPrice}</span>
              <span className="carddetails redtext">Rs.{product.price}</span>
            </div>
            {otherthansgoesandapprals ? (
              <Box height={15} />
            ) : (
              <>
                <h5 className="centre">Size : {size}</h5>
                <div className="size">
                  {product.productCategory === "Shoes"
                    ? shoeSizes.map((size, id) => (
                        <button
                          onClick={() => setSize(size)}
                          className="sizebutton"
                          key={id}
                        >
                          {size}
                        </button>
                      ))
                    : sizes.map((size, id) => (
                        <button
                          onClick={() => setSize(size)}
                          className="sizebutton"
                          key={id}
                        >
                          {size}
                        </button>
                      ))}
                </div>
              </>
            )}

            <div className="quantity">
              <span className="qheader">Quantity</span>
              <button
                className="bq"
                variant="contained"
                onClick={() =>
                  setquantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button
                className="bq"
                variant="contained"
                onClick={() => setquantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <div className="addcartbtn">
              <button onClick={handleAddtoCart}>ADD TO CART</button>
            </div>
          </div>
        ) : (
          <div className="wishtocartcard">
            <div className="">
              <CancelIcon
                className="cancel"
                onClick={() => setshowcart(!showcart)}
              />
            </div>
            <span className="wish">{product.productName}</span>
            <div className="price2">
              <span className="carddetails cuttext">Rs.{product.oldPrice}</span>
              <span className="carddetails redtext">Rs.{product.price}</span>
            </div>
            {otherthansgoesandapprals ? (
              <Box height={25} />
            ) : (
              <>
                <span className="wish">Size : {size}</span>
                <div className="size">
                  {product.productCategory === "Shoes"
                    ? shoeSizes.map((size, id) => (
                        <button
                          onClick={() => setSize(size)}
                          className="sizebutton"
                          key={id}
                        >
                          {size}
                        </button>
                      ))
                    : sizes.map((size, id) => (
                        <button
                          onClick={() => setSize(size)}
                          className="sizebutton"
                          key={id}
                        >
                          {size}
                        </button>
                      ))}
                </div>
              </>
            )}
            <div className="quantity">
              <span className="qheader">Quantity</span>
              <button
                className="bq"
                variant="contained"
                onClick={() =>
                  setquantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button
                className="bq"
                variant="contained"
                onClick={() => setquantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <div className="wishcartbtn">
              <button onClick={handleAddtoCart}>ADD TO CART</button>
            </div>
          </div>
        ))}
      <div className="details">
        <span className="carddetails detailhead">{product.productName}</span>
        <div className="rating">
          <Rating
            size="small"
            name="read-only"
            value={product.rating}
            readOnly
          />
        </div>
        <div className="price">
          <span className="carddetails cuttext">Rs.{product.oldPrice}</span>
          <span className="carddetails redtext">Rs.{product.price}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
