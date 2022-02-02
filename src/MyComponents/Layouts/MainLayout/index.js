import React from "react";
import "./styles.css";

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
