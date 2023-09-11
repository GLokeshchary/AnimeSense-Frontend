import { useEffect, useRef, useState } from "react";
import "./Products.css";
import React from "react";
import { useParams } from "react-router-dom";
import ProductsList from "./ProductsList";
import axios from "axios";
import Loading from "./Loading";
const colors = ["Red", "Blue", "Green", "Yellow", "Orange", "Black", "Purple"];
const categories = [
  "Hoodies",
  "Jackets",
  "Sweatshirts",
  "Shoes",
  "Caps",
  "Stickers",
  "Posters",
  "T-Shirts",
  "OverSized-T-Shirts",
  "Tank Top",
  "Joggers",
  "Boxers",
  "Bags",
];
const animeNameList = [
  "One Piece",
  "Naruto",
  "Tokyo Revengers",
  "Attack On Titan",
  "Jujustu Kaisen",
  "Demon Slayer",
  "Dragon Ball",
];
function Products() {
  const [products, setproducts] = useState([]);
  const [color, setcolor] = useState("");
  const [loading, setloading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { name } = useParams();
  const isAnime = animeNameList.includes(name);
  const isCategory = categories.includes(name);
  document.title = name;
  useEffect(() => {
    if (isAnime) {
      axios
        .get(
          "https://anime-sense-backend-production.up.railway.app/product/anime/" +
            name
        )
        .then((response) => {
          setproducts(response.data);
          setloading(false);
        })
        .catch((error) => console.log(error));
    }

    axios
      .get(
        "https://anime-sense-backend-production.up.railway.app/product/category/" +
          name
      )
      .then((response) => {
        setproducts(response.data);
        setloading(false);
      })
      .catch((error) => console.log(error));
  }, [name]);
  const clearFilters = () => {
    setSelectedCategory("");
    setMaxPrice("");
    setcolor("");
    setproducts(products);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="products">
      <div className="p-left">
        <div className="filter-items">
          <div className="catgeory">
            <h2>CATEGORIES</h2>
            {isAnime ? (
              <div className="category-buttons">
                {categories.map((category) => (
                  <div key={category}>
                    <button onClick={() => setSelectedCategory(category)}>
                      {category}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="category-buttons" key={name}>
                <button
                  onClick={() => {
                    setSelectedCategory(name);
                  }}
                >
                  {name}
                </button>
              </div>
            )}

            <br />
          </div>
          <h2>PRICE</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={4000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filter-items">
          <h2>FILTER BY COLOR</h2>
          <div className="category-buttons">
            {colors.map((colo) => (
              <button key={colo} onClick={() => setcolor(colo)}>
                {colo}
              </button>
            ))}
          </div>
        </div>
        {selectedCategory !== "" || maxPrice !== "" || color !== "" ? (
          <div className="clear">
            <button onClick={clearFilters}>Clear All Filters</button>
          </div>
        ) : null}
      </div>
      <div className="p-right">
        <img
          className="categoyImg"
          src="https://wallpapercave.com/wp/wp3304887.jpg"
          alt="categoryImg"
        />
        <div className="cat-header">{name}</div>
        <div className="list">
          <ProductsList
            products={products}
            selectedCategory={selectedCategory}
            price={maxPrice}
            color={color}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
