import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FireDB from "../../Firebase/config";
//import { Products } from "../../assets/Products/ProdouctLists";
import "./styles.css";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

function ShopProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  useEffect(() => {
    getData();
  }, []);
  //Testing firebase db
  /* async function addData() {
    try {
      await addDoc(collection(FireDB, "users"), {
        Name: "Pushpa Lama",
        Age: 24,
      });
    } catch (error) {
      console.log(error);
    }
  }
    */
  async function getData() {
    try {
      const users = await getDocs(collection(FireDB, "products"));
      const ProductsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        ProductsArray.push(obj);
      });
      setProducts(ProductsArray);
      //console.log(ProductsArray);
    } catch (error) {
      console.log(error);
    }
  }
  /*
  // Testing firebase db
  function addProductData() {
    Products.map(async (product) => {
      try {
        await addDoc(collection(FireDB, "products"), product);
      } catch (error) {
        console.log(error);
      }
    });
  } */
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
    <div className="container mt-2">
      <h1 className="heading-1 text-center stroke">Our Products</h1>
      <div className="d-flex">
        <div className="nav-item col-6">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="text"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
              placeholder="Search products......."
              aria-label="Search"
            />
          </form>
        </div>
        <select
          className="form-control"
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="Tibetian">Amulya</option>
          <option value="Chinese">Chinese</option>
        </select>
      </div>
      <div className="row pt-1">
        {products
          .filter((obj) => obj.Name.toLowerCase().includes(searchKey))
          .filter((obj) => obj.Category.includes(filterType))
          .map((product) => {
            return (
              <div className="col-md-4 ">
                <div className="m-2 p-2 product-item">
                  <div className="product-card">
                    <div className="text-center">
                      <img
                        src={product.ImageUrl}
                        alt=""
                        className="productimg"
                      />
                    </div>

                    <div className="card" style={{ width: "20rem" }}>
                      <div className="card-body">
                        <div className="d-flex">
                          <h5 className="card-title">{product.Name}</h5>
                          <span className="ms-auto ">${product.Price}</span>
                        </div>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {product.Category}
                        </h6>

                        <p className="card-text">
                          {product.Knot}-{product.Material}-{product.Shape}
                        </p>
                        <div className="row mb-1">
                          <button
                            className="btn btn-outline-dark"
                            onClick={() => {
                              navigate(`/productinfo/${product.id}`);
                            }}
                          >
                            DETAILS
                          </button>
                        </div>
                        <div className="row">
                          <button
                            className="btn btn-outline-dark"
                            onClick={() => addToCart(product)}
                          >
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ShopProducts;
