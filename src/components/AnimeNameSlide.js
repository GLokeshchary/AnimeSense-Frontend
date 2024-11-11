import React from "react";
import "./AnimeNameSlide.css";
import AnimeNameSlider from "./AnimeNameSlider";
import { shopByAnime } from "./Constants";
import { Link } from "react-router-dom";

function AnimeNameSlide() {
  return (
    <>
      <div className="name-wrapper">
        <div className="header">Pick Your Poison</div>
        {/* <div className="animename">
        {shopByAnime.map((item, id) => (
          <Link to={"/products/" + item.name} key={id}>
            <div className="anime-logo">
              <img src={item.banner} alt={id} />
            </div>
          </Link>
        ))}
       
      </div> */}
      </div>
      <AnimeNameSlider />
    </>
  );
}

export default AnimeNameSlide;
