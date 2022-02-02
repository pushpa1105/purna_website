import React from "react";

//import { Products } from "../../assets/Products/ProdouctLists";
import "./styles.css";

import MainLayout from "../../MyComponents/Layouts/MainLayout";
import ShopProducts from "../../MyComponents/ShopProducts";
import Carousel from "../../MyComponents/Carousel";

function HomePage() {
  return (
    <MainLayout>
      <div>
        <Carousel />
        <ShopProducts />
      </div>
    </MainLayout>
  );
}

export default HomePage;
