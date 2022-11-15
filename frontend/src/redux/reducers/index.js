import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import authReducer from "./authReducer";
import ordersReducer from "./ordersReducer";
import categoriesReducer from "./categoryReducer";

export default combineReducers({
  products: productsReducer,
  auth: authReducer,
  orders: ordersReducer,
  categories: categoriesReducer,
});
