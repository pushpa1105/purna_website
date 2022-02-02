import React from "react";
import "./styles.css";

function Carousel() {
  return (
    <div
      id="carouselExampleDark"
      className="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <img
            src="https://www.ismen.com/image/cache/catalog/slider/area-rugs-banner-1920x680.jpg"
            className="image d-block w-100"
            alt="..."
          />
          <div className="left-caption">
            <span>_________________</span>
            <h3>NEW PRODUCT</h3>
            <h1>Handmade Carpet</h1>
            <p className="feature">Washable and Long-Lasting carpet</p>
            <button className="btn btn-outline-dark">DETAILS</button>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <img
            src="https://www.ismen.com/image/cache/catalog/slider/area-rugs-banner-1920x680.jpg"
            className="d-block w-100"
            alt="..."
          />
          <div className="left-caption">
            <span>_________________</span>
            <h3>NEW PRODUCT</h3>
            <h1>Handmade Carpet</h1>
            <p className="feature">Washable and Long-Lasting carpet</p>
            <button className="btn btn-outline-dark">DETAILS</button>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <img
            src="https://www.ismen.com/image/cache/catalog/slider/area-rugs-banner-1920x680.jpg"
            className="d-block w-100"
            alt="..."
          />
          <div className="left-caption" data-bs-interval="5000">
            <span>_________________</span>
            <h3>NEW PRODUCT</h3>
            <h1>Handmade Carpet</h1>
            <p className="feature">Washable and Long-Lasting carpet</p>
            <button className="btn btn-outline-dark">DETAILS</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
