import { combineReducers } from "redux";
import { cartReducer } from "../CartReducer";

const RootReducer = combineReducers({
  cartReducer: cartReducer,
});

export default RootReducer;
