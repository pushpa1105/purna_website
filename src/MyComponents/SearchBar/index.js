import React from "react";
import "./styles.css";

function SearchBar() {
  return (
    <div>
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="form">
              {" "}
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control form-input"
                placeholder="Search Products..."
              />
              <span className="left-pan">
                <button class="btn btn-outline-success" type="submit">
                  Search
                </button>
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
