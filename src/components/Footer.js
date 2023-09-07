import { Box, Button } from "@mui/material";
import React from "react";
import { SocialIcon } from "react-social-icons";
import "./Footer.css";
import { Link } from "react-router-dom";
const apparelsList = [
  "T-Shirts",
  "OverSized-T-Shirts",
  "Tank Top",
  "Joggers",
  "Boxers",
];

function Footer() {
  return (
    <div className="foot-wrapper">
      <div className="foot-top">
        <div className="location">
          <div className="l-header">LOCATION</div>
          <div className="l-context">
            16-21-178 Vishal Nagar Kuktapally Hyderabad Telanagana 500012
          </div>
          <div className="l-email">
            <span>Email :</span>support@animesense.in
          </div>
          <Box height={15} />
          <div className="social-icons">
            <div>
              <SocialIcon
                target="_blank"
                url="https://www.instagram.com/__starshot__/"
              />
            </div>
            <div>
              <SocialIcon
                target="_blank"
                url="https://www.youtube.com/channel/UC-pPkgbJE4VfOubZrARclkg"
              />
            </div>
            <div>
              <SocialIcon
                target="_blank"
                url="https://github.com/GLokeshchary"
              />
            </div>
          </div>
        </div>
        <div className="information">
          <div className="l-header">INFORMATION</div>
          <div className="el-link">
            <div>Our Story</div>
            <div>Contact Us</div>
            <div>Terms & Conditions</div>
          </div>
        </div>
        <div className="side-links">
          <div className="l-header">SIDE LINKS</div>
          <div className="el-link">
            {apparelsList.map((item) => (
              <div key={item}>
                <Link to={"/products/" + item}>{item}</Link>
              </div>
            ))}
          </div>
        </div>
        <div className="newsletter">
          <div className="l-header">NEWS LETTER</div>
          <div>
            <Button variant="contained" color="error">
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <div className="copyright">© 2023 Anime Sense All Rights Reserved.</div>
        <div className="paytmm">
          <img
            src="https://www.fansarmy.in/cdn/shop/files/Untitled_design_4.webp?v=1685622140"
            alt="payments"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
