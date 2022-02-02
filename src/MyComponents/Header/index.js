import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
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

import logo from "../../assets/logo.png";
import "./styles.css";

function Header() {
  const { cartItems } = useSelector((state) => state.cartReducer);

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };
  return (
    <div>
      <header className="header">
        <nav className=" navbar  bgcolor">
          <ul className="d-flex  ps-2">
            <li>
              <FaPhoneSquareAlt />
              +977-9861771481
            </li>
            <li>
              <FaFacebook />
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaTiktok />
            </li>
            <li>
              <FaYoutube />
            </li>
          </ul>
        </nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light stroke nav-second navbar-fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img
                className="logo"
                src={logo}
                alt="Logo"
                width="90"
                height="60"
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/shop"
                  >
                    Shop
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/custom-carpet"
                  >
                    Custom Carpet
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/about-us"
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/contact-us"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>

              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown ">
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa fa-user" aria-hidden="true"></i>
                  </a>
                  {localStorage.getItem("currentUser") && (
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className=" dropdown-item "
                          aria-current="page"
                          to="/orders"
                        >
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          className=" dropdown-item  "
                          aria-current="page"
                          to="/"
                          onClick={logout}
                        >
                          LogOut
                        </Link>
                      </li>
                    </ul>
                  )}
                  {!localStorage.getItem("currentUser") && (
                    <ul
                      className="dropdown-menu "
                      aria-labelledby="navbarDarkDropdown"
                    >
                      <li>
                        <Link
                          className=" dropdown-item "
                          aria-current="page"
                          to="/login"
                        >
                          Login
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/cart"
                  >
                    <FaShoppingCart /> {cartItems.length}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
