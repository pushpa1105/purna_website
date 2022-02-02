import React, { useState, useEffect } from "react";
import MainLayout from "../../MyComponents/Layouts/MainLayout";

import FireDB from "../../Firebase/config";
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./styles.css";

function ProductInfo() {
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const productTemp = await getDoc(
        doc(FireDB, "products", params.productid)
      );
      setProduct(productTemp.data());
    } catch (error) {
      console.log(error);
    }
  }
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  //To avoid loss of data on cart on reload
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  //Add to cart function
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
    <MainLayout>
      {product && (
        <div class="container">
          <div class="col-lg-10 border p-3 main-section bg-white">
            <div class="row hedding m-0 pl-3 pt-0 pb-3">Product Detail</div>
            <div class="row m-0">
              <div class="col-lg-4 left-side-product-box pb-3">
                <img src={product.ImageUrl} class="border p-3" />
                <span class="sub-img">
                  <img src={product.ImageUrl} class="border p-2" />
                  <img src={product.ImageUrl} class="border p-2" />
                  <img src={product.ImageUrl} class="border p-2" />
                </span>
              </div>
              <div class="col-lg-8">
                <div class="right-side-pro-detail border p-3 m-0">
                  <div class="row">
                    <div class="col-lg-12">
                      <span>{product.Name}</span>
                      <p class="m-0 p-0">{product.Category}</p>
                    </div>
                    <div class="col-lg-12">
                      <p class="m-0 p-0 price-pro">{product.Price}</p>
                      <hr class="p-0 m-0" />
                    </div>
                    <div class="col-lg-12 pt-2">
                      <h5>Product Detail</h5>
                      <strong>Category : </strong>
                      <span>{product.Knot}</span>
                      <div class="col-lg-12 pt-2">
                        <strong>Shape : </strong>
                        <span>{product.Shape}</span>
                      </div>
                      <div class="col-lg-12 pt-2">
                        <strong>Size : </strong>
                        <span>{product.Size}</span>
                      </div>
                      <hr class="m-0 pt-2 mt-2" />
                    </div>

                    <div class="col-lg-12 mt-3">
                      <div class="row">
                        <div class="col-lg-6 pb-2">
                          <button
                            class="btn btn-danger w-100"
                            onClick={() => addToCart(product)}
                          >
                            Add To Cart
                          </button>
                        </div>
                        <div class="col-lg-6">
                          <Link to="/" class="btn btn-success w-100">
                            Shop Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default ProductInfo;
