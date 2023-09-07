import React from "react";
import "./DropDownNavBar.css";
import { Link } from "react-router-dom";

const apparelsList = [
  "T-Shirts",
  "OverSized-T-Shirts",
  "Tank Top",
  "Joggers",
  "Boxers",
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
const winterlist = ["Hoodies", "Jackets", "Sweatshirts"];
const accessoriesList = ["Shoes", "Caps", "Stickers", "Posters", "Bags"];
function DropDownNavBar({ name, type }) {
  return (
    <>
      <div className="dropdown">
        <button className="dropbtn">
          <div className="animestyel">{name}</div>
        </button>
        <div className="dropdown-content">
          {type === "anime" ? (
            <>
              <div className="heading-image">
                <img
                  src="https://www.pngmart.com/files/21/Anime-Male-PNG-Isolated-Pic.png"
                  alt="Gojo Satoru.jpg"
                />
              </div>
              <div className="animelist">
                <span className="heading">Anime Name</span>
                <ul className="animenamelist">
                  {animeNameList.map((item, id) => (
                    <Link key={id} to={"/products/" + item}>
                      <li>{item}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="heading-image">
                <img
                  src="https://www.pngmart.com/files/13/Luffy-PNG-Image.png"
                  alt="luffy.jpeg"
                />
              </div>
              <div className="dropdown-left">
                <div className="dropdown-head">
                  <span>APPARELS</span>
                </div>
                <div className="dropdown-list">
                  <ul>
                    {apparelsList.map((item, index) => (
                      <Link key={index} to={"/products/" + item}>
                        <li key={item}>{item}</li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="dropdown-middle">
                <div className="dropdown-head">
                  <span>WINTER WEAR</span>
                </div>
                <div className="dropdown-list">
                  <ul>
                    {winterlist.map((item, id) => (
                      <Link key={id} to={"/products/" + item}>
                        <li>{item}</li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="dropdown-right">
                <div className="dropdown-head">
                  <span>ACCESSORIES</span>
                </div>
                <div className="dropdown-list">
                  <ul>
                    {accessoriesList.map((item, id) => (
                      <Link key={id} to={"/products/" + item}>
                        <li>{item}</li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DropDownNavBar;
