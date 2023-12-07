import React from "react";
import Logo from "../img/logo.jpg";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" className="logo"/>
      <span>
      <b>Made with ♥️, React.js and MySQL</b>.
      </span>
    </footer>
  );
};

export default Footer;
