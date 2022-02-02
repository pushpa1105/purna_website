import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "../RootReducer";

const composeEnhancers = composeWithDevTools({});
const initialStore = {
  cartReducer: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) ?? [],
  },
};
export const store = createStore(RootReducer, initialStore, composeEnhancers());
