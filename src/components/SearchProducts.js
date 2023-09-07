import React, { useEffect, useState } from "react";
import "./SearchProducts.css";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";

import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

function SearchProducts() {
  const [open, setOpen] = useState(false);
  const [searchvalue, setsearchvalue] = useState("");
  const [products, setproducts] = useState([]);
  const [filteredproducts, setfilteredproducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/product/all")
      .then((response) => setproducts(response.data))
      .catch((error) => console.log(error));
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const filteredP = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchvalue.toLowerCase()) ||
      product.productCategory.toLowerCase() === searchvalue.toLowerCase() ||
      product.animeName.toLowerCase() === searchvalue.toLowerCase()
  );
  return (
    <div className="search-contaier">
      <div onClick={handleOpen}>
        <SearchIcon />
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="next">
          <div className="ppppp">
            <span className="head">What are you looking for?</span>
            <button onClick={handleClose}>
              <CancelIcon />
            </button>
          </div>
          <div>
            <input
              type="text"
              value={searchvalue}
              placeholder="Search For Product, brands, Name and more"
              onChange={(e) => setsearchvalue(e.target.value)}
            />
            <SearchIcon onClose={handleClose} />
          </div>
          <div className="searchlist">
            {searchvalue &&
              filteredP.map((product) => (
                <Link
                  key={product.productId}
                  to={"/product/" + product.productId}
                >
                  <div className="searchp" onClick={handleClose}>
                    <img src={product.imageUrls[0]} alt={product.productId} />
                    <div className="sdetails">
                      <span className="pname">{product.productName}</span>
                      <span className="pprice">Rs. {product.price}.00</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SearchProducts;
