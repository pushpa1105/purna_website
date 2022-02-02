import React from 'react';

import "./styles.css";
import ShopProducts from "../../MyComponents/ShopProducts";
import MainLayout from "../../MyComponents/Layouts/MainLayout";

function ShopPage() {
  return(
    <MainLayout>
      <ShopProducts/>
      </MainLayout>
  )
}

export default ShopPage;
