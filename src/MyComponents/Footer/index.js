import React from "react";
import { Link } from "react-router-dom";

//sociallinks
import {
  Facebook,
  Youtube,
  Instagram,
  LinkedIn,
  Twitter,
} from "../../assets/SocialLink";

function Footer() {
  return (
    <div className="text-center">
      <footer className="footer">
        <div
          className="container-fluid pt-4"
          style={{ backgroundColor: "#f1f1f1" }}
        >
          <section className="mb-4">
            <div className="row text-center d-flex justify-content-center pt-5 mb-3">
              <div className="col-md-2 mb-3">
                <h6 className="text-uppercase font-weight-bold ">
                  <Link to="/">Home</Link>
                </h6>
              </div>
              <div className="col-md-2 mb-3">
                <h6 className="text-uppercase font-weight-bold 	">
                  <Link to="/plants">Products</Link>
                </h6>
              </div>
              <div className="col-md-2 mb-3">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="/gc">Gallery</Link>
                </h6>
              </div>
              <div className="col-md-2 mb-3">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="/News">About Us</Link>
                </h6>
              </div>
              <div className="col-md-2 mb-3">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="/faq">Contact US</Link>
                </h6>
              </div>
            </div>
            <hr className="rgba-white-light" style={{ margin: "0 15%" }} />
            <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
              <div className="col-md-8 col-12 mt-5">
                <p style={{ lineHeight: "1.7rem" }}>
                  Purna Carpet Factory is a best custom carpet exporter since
                  2000. Purna Carpet Factory is a best custom carpet exporter
                  since 2000. Purna Carpet Factory is a best custom carpet
                  exporter since 2000. Purna Carpet Factory is a best custom
                  carpet exporter since 2000.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <Link
              className="btn btn-a btn-floating btn-lg text-dark m-1"
              to={Facebook}
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>

            <Link
              className="btn btn-a btn-floating btn-lg text-dark m-1"
              to={Twitter}
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-twitter"></i>
            </Link>

            <Link
              className="btn btn-a btn-floating btn-lg text-dark m-1"
              to="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-google"></i>
            </Link>
            <Link
              className="btn btn-a btn-floating btn-lg text-dark m-1"
              to={Instagram}
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-instagram"></i>
            </Link>
            <Link
              className="btn btn-a btn-floating btn-lg text-dark m-1"
              to={LinkedIn}
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-Linkedin"></i>
            </Link>
          </section>
        </div>

        <div
          className="text-center text-dark p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2021 Copyright:
          <Link className="text-dark" to="#">
            Purna Carpet Factory
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
