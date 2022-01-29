import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import instagram from "../../../images/instagram.jfif";
import linkedin from "../../../images/linkedin.jfif";
import twitter from "../../../images/twitter.jfif";
import facebook from "../../../images/facebook.jfif";
import logo2 from "../../../images/logo2.png"
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer id="footer">
        <div className="rightFooter">
          <h4>Stay in Touch</h4>
          <div className="right">
            <a href="http://instagram.com" target="blank">
              <img src={instagram} alt="instagram" />
            </a>
            <a href="http://twitter.com" target="blank">
              <img src={twitter} alt="twitter" />
            </a>
            <a href="http://facebook.com" target="blank">
              <img src={facebook} alt="facebook" />
            </a>
            <a href="http://linkedin.com" target="blank">
              <img src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>

        <div className="midFooter">
          <img src={logo2} alt="Eshopperz" />
          <p>Makes you feel like shopping</p>
        </div>

        <div className="leftFooter">
          <p>Get our App on</p>
          <a href="https://play.google.com/store" target="blank">
            <img src={playStore} alt="playstore" />
          </a>
          <a href="https://www.apple.com/in/app-store/" target="blank">
            <img src={appStore} alt="Appstore" />
          </a>
        </div>
      </footer>
      <div className="copyright">
        <p>Copyrights 2021 &copy; Eshopperz - All rights reserved </p>
      </div>
    </div>
  );
};

export default Footer;
