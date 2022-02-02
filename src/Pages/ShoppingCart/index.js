import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

//firebase
import FireDB from "../../Firebase/config";
import { addDoc, collection } from "firebase/firestore";

import MainLayout from "../../MyComponents/Layouts/MainLayout";
import "./styles.css";

function ShoppingCart() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [TotalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  //Order Placement
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [date, setDate] = useState("");
  const [staddress, setStAddress] = useState("");
  const [staddressl2, setStAddressL2] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [pnumber, setPNumber] = useState("");

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((Item) => {
      let tempAmount = Item.quantity * Item.Price;
      temp = temp + tempAmount;
    });
    setTotalAmount(temp);
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };
  const AddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const reduceCartItem = (product) => {
    dispatch({ type: "REDUCE_CART_ITEM", payload: product });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const placeorder = async () => {
    const name = {
      fname,
      lname,
    };
    const address = {
      staddress,
      staddressl2,
      city,
      region,
      country,
      postalcode,
      pnumber,
    };
    console.log(address);
    const orderInfo = {
      cartItems,
      name,
      address,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };
    try {
      const result = await addDoc(collection(FireDB, "orders"), orderInfo);
      toast.success("Order Placed Successfully!!");
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Placing Order Failed ");
    }
  };
  return (
    <MainLayout>
      {cartItems.length > 0 ? (
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
            {cartItems.map((item) => {
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
                          <span className="item-quantity">1</span>* {item.Name}
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

                  <div className="btn-group quantity">
                    <button
                      className="btnDecrease"
                      onClick={() => reduceCartItem(item)}
                    >
                      -
                    </button>
                    <button className=" btn-light">{item.quantity}</button>
                    <button
                      onClick={() => AddToCart(item)}
                      className="btnIncrease"
                    >
                      +
                    </button>
                  </div>
                  <div className="subtotal">{item.quantity * item.Price}</div>
                  <div className="remove">
                    <button onClick={() => deleteFromCart(item)}>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
          <aside>
            <div className="summary">
              <div className="summary-total-items">
                <span className="total-items"></span> Items in your Bag
              </div>
            </div>
            <div className="summary-labels">
              <ul>
                <li className="item">Item</li>

                <li className="subtotal ps-1">Subtotal</li>
              </ul>
            </div>

            {cartItems.map((item) => {
              return (
                <div className="summary-products">
                  <ul>
                    <li className="item">
                      {item.Name} - {item.quantity} pieces
                    </li>

                    <li className="subtotal">{item.Price * item.quantity}</li>
                  </ul>
                </div>
              );
            })}

            <div className="summary-total">
              <div className="total-title">Total</div>
              <div className="total-value final-value" id="basket-total">
                {TotalAmount}
              </div>
            </div>
            <div className="summary-checkout">
              <button className="checkout-cta" onClick={handleShow}>
                Go to Secure Checkout
              </button>
            </div>
          </aside>
        </main>
      ) : (
        <p className="text-center">Your cart is empty. Happy Shopping!!</p>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Place Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="order-form my-4 mx-4">
            <div className="container pt-4">
              <div className="row">
                <div className="col-12">
                  <h1>My Order Form</h1>
                  <span>Purna Carpet Udhyog</span>
                  <hr className="mt-1" />
                </div>
                <div className="col-12">
                  <div className="row mx-4">
                    <div className="col-12 mb-2">
                      <label className="order-form-label">Name</label>
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        className="order-form-input"
                        placeholder="First"
                        value={fname}
                        onChange={(e) => {
                          setFName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-12 col-sm-6 mt-2 mt-sm-0">
                      <input
                        className="order-form-input"
                        placeholder="Last"
                        value={lname}
                        onChange={(e) => {
                          setLName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mx-4">
                    <div className="col-12 mb-2">
                      <label className="order-form-label">Phone Number</label>
                    </div>
                    <div className="col-sm-12">
                      <input
                        className="order-form-input"
                        placeholder="First"
                        value={pnumber}
                        onChange={(e) => {
                          setPNumber(e.target.value);
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
                        Date
                      </label>
                    </div>
                    <div className="col-12">
                      <input
                        className="order-form-input datepicker"
                        placeholder="Selected date"
                        type="text"
                        id="date-picker-example"
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row mt-3 mx-4">
                    <div className="col-12">
                      <label className="order-form-label">Address</label>
                    </div>
                    <div className="col-12">
                      <input
                        className="order-form-input"
                        placeholder="Street Address"
                        value={staddress}
                        onChange={(e) => {
                          setStAddress(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-12 mt-2">
                      <input
                        className="order-form-input"
                        placeholder="Street Address Line 2"
                        value={staddressl2}
                        onChange={(e) => {
                          setStAddressL2(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-12 col-sm-6 mt-2 pr-sm-2">
                      <input
                        className="order-form-input"
                        placeholder="City"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-12 col-sm-6 mt-2 pl-sm-0">
                      <input
                        className="order-form-input"
                        placeholder="Region"
                        value={region}
                        onChange={(e) => {
                          setRegion(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-12 col-sm-6 mt-2 pr-sm-2">
                      <input
                        className="order-form-input"
                        placeholder="Postal / Zip Code"
                        value={postalcode}
                        onChange={(e) => {
                          setPostalCode(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-12 col-sm-6 mt-2 pl-sm-0">
                      <input
                        className="order-form-input"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row mt-3 mx-4">
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="validation"
                          id="validation"
                          value="1"
                        />
                        <label for="validation" className="form-check-label">
                          I know what I need to know
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-12">
                      <button
                        type="button"
                        id="btnSubmit"
                        className="btn btn-dark d-block mx-auto btn-submit"
                        onClick={placeorder}
                      >
                        Place Order
                      </button>
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
    </MainLayout>
  );
}

export default ShoppingCart;
