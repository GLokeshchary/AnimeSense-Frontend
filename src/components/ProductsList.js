import React from "react";

import Card from "../components/Card";
import "./ProductsList.css";
import EmptyCart from "./EmptyCart";
function ProductsList(props) {
  const { products, selectedCategory, price, sortOrder, color } = props;
  const filteredproducts = products.filter((product) => {
    const passesCategoryFilter =
      selectedCategory === "" || product.productCategory === selectedCategory;
    const passesColorFilter = color === "" || product.productColor === color;
    const passesPriceFilter = price === "" || product.price <= price;
    return passesCategoryFilter && passesColorFilter && passesPriceFilter;
  });
  if (filteredproducts.length === 0) {
    return (
      <EmptyCart
        image="https://media.tenor.com/B_U69Q8sALgAAAAC/one-piece-no.gif"
        name="Not Found"
      />
    );
  }
  if (products.length === 0) {
    return (
      <div>
        <EmptyCart
          image="https://i.pinimg.com/originals/44/02/3e/44023e8f19e7a438e581635120945351.gif"
          name="No Products Found"
        />
      </div>
    );
  }
  return (
    <div>
      <div className="products-list">
        {filteredproducts &&
          filteredproducts.map((product, id) => (
            <Card key={id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default ProductsList;
