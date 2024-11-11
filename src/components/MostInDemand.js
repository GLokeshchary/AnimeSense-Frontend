import React from "react";
import "./MostInDemand.css";
import { Link } from "react-router-dom";
const demandList = [
  {
    name: "T-Shirts",
    images: "animeBackImages/mostindemandimages/T-Shirt.webp",
  },
  {
    name: "Hoodies",
    images: "animeBackImages/mostindemandimages/Hoodies.webp",
  },
  {
    name: "Shoes",
    images: "animeBackImages/mostindemandimages/Shoes.webp",
  },
  {
    name: "Combos",
    images: "animeBackImages/mostindemandimages/Combos.webp",
  },
];
function MostInDemand() {
  return (
    <div className="demand-wrapper">
      <div className="header">
        <span>Most In Demand</span>
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
