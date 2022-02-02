import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainLayout from "../../MyComponents/Layouts/MainLayout";
import FireDB from "../../Firebase/config";
//import { Products } from "../../assets/Products/ProdouctLists";
import "./styles.css";

import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";
function AdminPage() {
  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    Productname: " ",
    Price: 0,
    ImageUrl: "",
    Knot: "",
    Material: "",
    Shape: "",
    Size: "",
    Category: "",
  });
  useEffect(() => {
    getData();
  }, []);

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

  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };
  const updateProduct = async () => {
    try {
      await setDoc(doc(FireDB, "products", product.id), product);
      handleClose();
      toast.success("Updated Successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update!!");
    }
  };

  const addHandler = () => {
    setAdd(true);
    setShow(true);
  };

  const addProduct = async () => {
    try {
      await addDoc(collection(FireDB, "products"), product);
      handleClose();
      toast.success("New Product Added Successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add new Product!!");
    }
  };
  const deleteProduct = async (item) => {
    try {
      await deleteDoc(doc(FireDB, "products", item.id));
      toast.success("Product deleted successfully!!");
      getData();
    } catch (error) {
      console.log(error);
      toast.failed("Failed to delete product!!");
    }
  };

  //Orders page ko lagi

  const [orders, setOrders] = useState([]);
  const userid = JSON.parse(localStorage.getItem("currentUser")).user.uid;
  const [TotalAmount, setTotalAmount] = useState(0);
  const { cartItems } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + cartItem.Price;
    });
    setTotalAmount(temp);
  }, [cartItems]);
  useEffect(() => {
    getOrdersData();
  }, []);
  async function getOrdersData() {
    try {
      const result = await getDocs(collection(FireDB, "orders"));
      const OrdersArray = [];
      result.forEach((doc) => {
        OrdersArray.push(doc.data());
      });
      setOrders(OrdersArray);
      console.log(OrdersArray);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <MainLayout>
      <div className="p-2">
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Products" title="Products">
            <h1>Products</h1>
            <div className="d-flex justify-content-between">
              <h3>Product Lists</h3>
              <button onClick={addHandler}>Add Product</button>
            </div>

            <table class="table table-bordered">
              <thead>
                <tr className="table-primary">
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Shape</th>
                  <th scope="col">Size</th>
                  <th scope="col">Material</th>
                  <th scope="col">Knot</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              {products.map((item) => {
                return (
                  <tbody>
                    <tr>
                      <td className="product-image">
                        <img src={item.ImageUrl} alt="Placholder Image 2" />
                      </td>
                      <td>{item.Name}</td>
                      <td>{item.Price}</td>
                      <td>{item.Category}</td>
                      <td>{item.Shape}</td>
                      <td>{item.Size}</td>
                      <td>{item.Material}</td>
                      <td>{item.Knot}</td>
                      <td>
                        <FaTrash onClick={() => deleteProduct(item)} />
                        <FaEdit onClick={() => editHandler(item)} />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {add ? "Add a Product" : "Edit Product Details"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <section className="order-form my-4 mx-4">
                  <div className="container pt-4">
                    <div className="row">
                      <div className="col-12">
                        <h1>My Product Form</h1>
                        <span>Purna Carpet Udhyog</span>
                        <hr className="mt-1" />
                      </div>
                      <div className="col-12">
                        <div className="row mx-4">
                          <div className="col-12 mb-2">
                            <label className="order-form-label">
                              Product Name
                            </label>
                          </div>
                          <div className="col-12 col-sm-6">
                            <input
                              className="order-form-input"
                              placeholder="Product Name"
                              value={product.Name}
                              onChange={(e) => {
                                setProduct({
                                  ...product,
                                  Name: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="col-12 col-sm-6 mt-2 mt-sm-0">
                            <input
                              className="order-form-input"
                              placeholder="Category"
                              value={product.Category}
                              onChange={(e) => {
                                setProduct({
                                  ...product,
                                  Category: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="row mx-4">
                          <div className="col-12 mb-2">
                            <label className="order-form-label">Price</label>
                          </div>
                          <div className="col-sm-12">
                            <input
                              className="order-form-input"
                              placeholder="Price"
                              value={product.Price}
                              onChange={(e) => {
                                setProduct({
                                  ...product,
                                  Price: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="row mt-3 mx-4">
                          <div className="col-12">
                            <label
                              className="order-form-label"
                              for="date-picker-example"
                            >
                              ImageURL
                            </label>
                          </div>
                          <div className="col-12">
                            <input
                              className="order-form-input datepicker"
                              placeholder="ImageURL"
                              type="text"
                              id="date-picker-example"
                              value={product.ImageUrl}
                              onChange={(e) => {
                                setProduct({
                                  ...product,
                                  ImageUrl: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>

                        <div className="row mt-3 mx-4">
                          <div className="col-12">
                            <label className="order-form-label">
                              Materials
                            </label>
                          </div>
                          <div className="col-12">
                            <input
                              className="order-form-input"
                              placeholder="Material"
                              value={product.Material}
                              onChange={(e) => {
                                setProduct({
                                  ...product,
                                  Material: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="col-12">
                            <label className="order-form-label">Shape</label>
                          </div>
                          <div className="col-12 ">
                            <input
                              className="order-form-input"
                              placeholder="Size"
                              value={product.Size}
                              onChange={(e) => {
                                setProduct({
                                  ...product,
                                  Size: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="col-12">
                            <label className="order-form-label">Knot</label>
                          </div>
                          <div className="col-12 ">
                            <input
                              className="order-form-input"
                              placeholder="Knot"
                              value={product.Knot}
                              onChange={(e) => {
                                setProduct({
                                  ...product,
                                  Knot: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="col-12">
                            <label className="order-form-label">Size</label>
                          </div>
                          <div className="col-12 ">
                            <input
                              className="order-form-input"
                              placeholder="Size"
                              value={product.Size}
                              onChange={(e) => {
                                setProduct({
                                  ...product,
                                  Size: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="col-12">
                            <label className="order-form-label">
                              Product Code
                            </label>
                          </div>
                          <div className="col-12 ">
                            <input
                              className="order-form-input"
                              placeholder="PURNA-"
                              value={product.ProductId}
                              onChange={(e) => {
                                setProduct({
                                  ...product,
                                  ProductId: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-12">
                            {add ? (
                              <button
                                type="button"
                                id="btnSubmit"
                                className="btn btn-dark d-block mx-auto btn-submit"
                                onClick={addProduct}
                              >
                                Add a product
                              </button>
                            ) : (
                              <button
                                type="button"
                                id="btnSubmit"
                                className="btn btn-dark d-block mx-auto btn-submit"
                                onClick={updateProduct}
                              >
                                Save
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Modal.Body>
              <Modal.Footer>
                <button onClick={handleClose}>Close</button>
              </Modal.Footer>
            </Modal>
          </Tab>
          <Tab eventKey="Orders" title="Orders">
            <h1>Orders</h1>
            {orders.map((order) => {
              return (
                <main>
                  <div className="basket">
                    <div className="basket-labels">
                      <ul>
                        <li className="item item-heading">Item</li>
                        <li className="price">Price</li>
                        <li className="quantity">Quantity</li>
                        <li className="subtotal">Subtotal</li>
                      </ul>
                    </div>
                    {order.cartItems.map((item) => {
                      return (
                        <div className="basket-product">
                          <div className="item">
                            <div className="product-image">
                              <img
                                src={item.ImageUrl}
                                alt="Placholder Image 2"
                                className="product-frame"
                              />
                            </div>
                            <div className="product-details">
                              <h1>
                                <strong>
                                  <span className="item-quantity">1</span>*{" "}
                                  {item.Name}
                                </strong>{" "}
                                {item.Category}
                              </h1>
                              <p>
                                <strong>Navy, Size 18</strong>
                              </p>
                              <p>Product Code - 232321939</p>
                            </div>
                          </div>
                          <div className="price">{item.Price}</div>
                          <div className="quantity">
                            <input
                              type="number"
                              min="1"
                              className="quantity-field"
                            />
                          </div>
                          <div className="subtotal">{item.Price}</div>
                        </div>
                      );
                    })}
                  </div>
                </main>
              );
            })}
          </Tab>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default AdminPage;
