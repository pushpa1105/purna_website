import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import FireDB from "../../Firebase/config";
import MainLayout from "../../MyComponents/Layouts/MainLayout";

function OrdersPage() {
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
    getData();
  }, []);
  async function getData() {
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
    <div>
      <MainLayout>
        {orders
          .filter((obj) => obj.userid === userid)
          .map((order) => {
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
      </MainLayout>
    </div>
  );
}

export default OrdersPage;
