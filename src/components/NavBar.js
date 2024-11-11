import React, { useEffect, useRef, useState } from "react";
import "./NavBar.css";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
//icons import
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
//components
import SearchProducts from "./SearchProducts";
import DropDownUser from "./DropDownUser";
import DropDownNavBar from "./DropDownNavBar";
import WishListInNavBar from "./WishListInNavBar";
import CartInNavBar from "./CartInNavBar";

function NavBar() {
  const [currLocation, setcurrLocation] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [smallScreenTabs, setSmallScreenTabs] = useState(
    window.innerWidth <= 768
  );
  const navbarRef = useRef(null);
  const user = useSelector((state) => state.user.user) || {};
  const AdminLoggedin =
    useSelector((state) => state.user.AdminLoggedIn) || false;
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const wishlistItems =
    useSelector((state) => state.wishlist.wishlistItems) || [];
  useEffect(() => {
    axios
      .get("https://ipapi.co/json")
      .then((response) => setcurrLocation(response.data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    // Set smallScreenTabs based on window resize
    const handleResize = () => {
      setSmallScreenTabs(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false); // Close the menu
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [smallScreenTabs]);

  const getTotalQuantity = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };
  return (
    <>
      <div ref={navbarRef} className="navbar-container">
        <div className="nav-logo">
          <Link to="/">
            <div className="logo">Anime Sense</div>
          </Link>
        </div>
        {smallScreenTabs && (
          <div className="nav-small">
            <SearchProducts />
            <DropDownUser />
            <Link to="/wishlist">
              <WishListInNavBar wishlistItems={wishlistItems} />
            </Link>
            <NavLink to="/cart">
              <CartInNavBar totalQuantity={getTotalQuantity() || 0} />
            </NavLink>
          </div>
        )}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
        <div className={`mainnav-right ${menuOpen ? "active" : ""}`}>
          <div className="nav-left">
            <NavLink to="/">
              <div className="left-tabs">HOME</div>
            </NavLink>
            <div className="left-tabs">
              <DropDownNavBar name="SHOP BY PRODUCT " />
            </div>
            <div className="left-tabs">
              <DropDownNavBar type="anime" name="SHOP BY ANIME " />
            </div>
            <Link to={"/products/" + "Combos"}>
              <div className="left-tabs">COMBOS</div>
            </Link>
          </div>

          <div className="nav-right">
            {AdminLoggedin && (
              <Link to="/admin">
                <div className="right-tabs">ADMIN</div>
              </Link>
            )}
            {menuOpen ? (
              ""
            ) : (
              <>
                <div className="right-tabs">
                  <SearchProducts />
                </div>
                <div className="right-tabs">
                  <DropDownUser />
                </div>
                <Link to="/wishlist">
                  <div className="right-tabs">
                    <WishListInNavBar wishlistItems={wishlistItems} />
                  </div>
                </Link>
                <NavLink to="/cart">
                  <div className="right-tabs">
                    <CartInNavBar totalQuantity={getTotalQuantity() || 0} />
                  </div>
                </NavLink>
              </>
            )}
            {currLocation !== null ? (
              <div className="right-tabs">
                <LocationOnIcon />
                <span className="location"> {currLocation.city}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
