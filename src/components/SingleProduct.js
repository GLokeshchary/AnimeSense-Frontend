import { useEffect, useState } from "react";
import "./SingleProduct.css";
import React from "react";
import { Box, Button, Rating } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ToastMessage from "./ToastMessage";
import { addtoCart, buyNowItem } from "../redux/slice/cartSlice";
import { addtoWishlist, removewishlist } from "../redux/slice/wishlistSlice";
import ReviewById from "./ReviewById";
import NewlyLaunched from "./NewlyLaunched";
import Loading from "./Loading";
import Swal from "sweetalert2";

const sizes = ["S", "M", "L", "XL", "XXL"];
const shoeSizes = ["7", "8", "9", "10", "11"];
const initialProductValues = {
  productName: "",
  productCategory: "",
  animeName: "",
  rating: 1,
  imageUrls: [""],
  gender: "",
  price: 1,
  oldPrice: 1,
  stock: "",
};
function SingleProduct() {
  const [reviews, setreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setquantity] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [showcart, setshowcart] = useState(false);
  const [Product, setProduct] = useState(initialProductValues);
  const [size, setSize] = useState(() => {
    if (Product.productCategory === "Shoes") {
      return shoeSizes[0];
    } else {
      return sizes[0];
    }
  });
  const wishlistItems =
    useSelector((state) => state.wishlist.wishlistItems) || [];
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const LoggedIn = useSelector((state) => state.user.LoggedIn) || false;
  const navigate = useNavigate();
  const wishtrue = wishlistItems.find((item) => item.id === Product.productId);
  useEffect(() => {
    axios
      .get(
        "https://anime-sense-backend-production.up.railway.app/product/" +
          productId
      )
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    axios
      .get(
        "https://anime-sense-backend-production.up.railway.app/reviews/" +
          productId
      )
      .then((response) => {
        setreviews(response.data);
        setLoading(false);
      });
  }, [productId]);
  document.title = Product.productName;
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleAddtoCart = () => {
    const id = Product.productId;
    const product = Product;
    dispatch(addtoCart({ product, quantity, size, id }));
    setshowcart(!showcart);
    const carttrue = cartItems.find((item) => item.id === Product.productId);
    if (carttrue) {
      ToastMessage({
        type: "info",
        image:
          "https://media.tenor.com/EbVjc7sjMucAAAAd/attack-on-titan-aot.gif",
        message: `${Product.productName} already in cart`,
      });
    } else {
      ToastMessage({
        type: "info",
        image: "https://media.tenor.com/awdwRkbJzCgAAAAC/goku.gif",
        message: `${Product.productName} added to cart`,
      });
    }
  };
  const handleWishlist = () => {
    const id = Product.productId;
    const product = Product;
    dispatch(addtoWishlist({ product, id }));
    if (wishtrue) {
      ToastMessage({
        type: "info",
        image: "https://media.tenor.com/O6hPzBhGmJcAAAAC/sanji-sanji-simp.gif",
        message: `${Product.productName} Already in Wishlist cart`,
      });
    }
    ToastMessage({
      type: "info",
      image: "https://media.tenor.com/O6hPzBhGmJcAAAAC/sanji-sanji-simp.gif",
      message: `${Product.productName} in Wishlist cart`,
    });
  };
  const otherthanshoesandapprals =
    Product.productCategory === "Bags" ||
    Product.productCategory === "Caps" ||
    Product.productCategory === "Posters" ||
    Product.productCategory === "Stickers";
  const handleNotWishList = () => {
    const id = Product.productId;
    dispatch(removewishlist(id));
    ToastMessage({
      type: "info",
      image: "https://media.tenor.com/t2cnacC8w7oAAAAC/one-piece-anime.gif",
      message: `Removed from  Wishlist cart`,
    });
  };
  const handlebuyNow = () => {
    const id = Product.productId;
    const product = Product;
    const data = true;
    if (LoggedIn) {
      dispatch(buyNowItem({ product, quantity, size, id }));
      navigate("/bcheckout/information", { state: data });
    } else {
      Swal.fire({
        icon: "question",
        title: "Please Login To Proceed",
        confirmButtonText: "Log In",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="ss-container">
      <div className="singleproduct">
        <div className="sp-left">
          <div className="sp-images">
            {Product.imageUrls.map((image, id = 0) => (
              <img
                key={id}
                src={image}
                onClick={(e) => setSelectedImg(id)}
                alt={image}
              />
            ))}
          </div>
          <div className="sp-mainImg">
            <img src={Product.imageUrls[selectedImg]} alt={selectedImg} />
          </div>
        </div>
        <div className="sp-right">
          <span className="sp-header">{Product.productName}</span>
          <div className="ratingcol">
            <Rating
              readOnly
              size="medium"
              name="read-only"
              value={Product.rating}
            />
            {reviews.length === 0 ? null : <>{reviews.length} reviews</>}{" "}
          </div>
          <div className="sp-price">
            <span className="price1">Rs {Product.price}</span>
            <span className="price2">Rs {Product.oldPrice}</span>
            <span className="discount">|</span>
            <span className="discount">
              Save Rs {Product.oldPrice - Product.price}
              {" | "}
              {(Product.oldPrice - Product.price) / 10}% Off
            </span>
          </div>
          {otherthanshoesandapprals ? (
            <Box height={15} />
          ) : (
            <div className="sp-size">
              <span>Size : {size}</span>
              <div className="sizelist">
                {Product.productCategory === "Shoes"
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
            </div>
          )}
          <div className="quantity">
            <span className="qheader">Quantity</span>
            <button
              className="bq"
              variant="contained"
              onClick={() => setquantity((prev) => (prev === 1 ? 1 : prev - 1))}
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
            <Button
              onClick={handlebuyNow}
              className="glowingbutton"
              variant="contained"
              color="error"
              fullWidth
            >
              <SentimentSatisfiedAltIcon />
              <span>BUY IT NOW</span>
            </Button>
          </div>
          <div className="addcbutton">
            {wishtrue ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNotWishList}
              >
                <FavoriteBorderIcon />
                <span>ADDED TO WISHLIST</span>
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleWishlist}
              >
                <FavoriteBorderIcon />
                <span>ADD TO WISHLIST</span>
              </Button>
            )}
            <Button variant="contained" color="error" onClick={handleAddtoCart}>
              <AddShoppingCartIcon />
              <span>ADD TO CART</span>
            </Button>
          </div>
          <div className="accordians">
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <span>Product Details</span>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  Description Style Over Size Fit: Fits loose. Unisex Fit:
                  Perfectly style for both Men and Women. Fabric 100% Cotton
                  Single Jersey and bio-washed. • Preshrunked • Super Combed
                  Compact Yarn for soft feel • 60-degree Color Fastness Which
                  Follows International Standards • Don’t Bleach & Wring • Dry
                  in Shade Style Brief Dressing down has never been easier
                  thanks to our oversized T-Shirts. We've got you covered with
                  everything from off-work vibes to casual and sporty-cool
                  looks. To complement out the slouchy look, pair your oversized
                  T-Shirt with slim jeans or cycling shorts and lace-up
                  sneakers.
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <span>Shipping details</span>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <h4>Returns Policy</h4>
                  <p>
                    {" "}
                    Product is available for return and replace within 10 days
                    after delivery. Check return and replace policy for more
                    details.
                  </p>
                  <h4>Shipping</h4>
                  <p>
                    Product will be shipped within 24-48 HRS after order time.
                    Cash collection charges applicable on COD shipping. Use
                    prepaid to avoid additional charges.
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      <ReviewById productId={productId} />
      <NewlyLaunched
        name="RELATED PRODUCTS"
        ProductName={Product.productName}
        similar={Product.productCategory}
        limit={10}
      />
      <NewlyLaunched name="TRENDING" />
    </div>
  );
}

export default SingleProduct;
