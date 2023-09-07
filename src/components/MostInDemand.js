import React from "react";
import "./MostInDemand.css";
import { Link } from "react-router-dom";
const demandList = [
  {
    name: "T-Shirts",
    images:
      "https://www.fansarmy.in/cdn/shop/products/21_6397ef67-db0d-4d7a-9d43-48942f9ee2b3_800x.jpg?v=1679574236",
  },
  {
    name: "Hoodies",
    images:
      "https://www.fansarmy.in/cdn/shop/products/72_800x.png?v=1672399575",
  },
  {
    name: "Shoes",
    images:
      "https://www.fansarmy.in/cdn/shop/files/43_b4094f27-aae7-4740-89b9-826a94acae03_1800x1800.jpg?v=1687081636",
  },
  {
    name: "Combos",
    images:
      "https://www.fansarmy.in/cdn/shop/products/KakashiXAkatsukiCombo_20_b56b2c59-d9c2-4715-9369-9ebd622d57aa_1800x1800.jpg?v=1634814169",
  },
];
function MostInDemand() {
  return (
    <div className="demand-wrapper">
      <div className="header">
        <span>MOST IN DEMAND</span>
      </div>
      <div className="image-wrapper">
        {demandList.map((item, id) => (
          <Link to={"/products/" + item.name} key={id}>
            <div className="imgcircle">
              <img src={item.images} alt={item.name} />
              <div>
                <span>{item.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MostInDemand;
