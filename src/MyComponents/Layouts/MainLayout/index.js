import React from "react";
import "./styles.css";
import {
  FaBars,
  FaFacebook,
  FaInstagram,
  FaPhoneSquareAlt,
  FaPinterest,
  FaShoppingCart,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

import Header from "../../Header";
import Footer from "../../Footer";

function MainLayout(props) {
  return (
    <div>
      <Header />
      <div className="content">{props.children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;
