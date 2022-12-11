import { combineReducers } from "redux";
import productsReducer, { getProductsReducer } from "./productsReducer";
import authReducer from "./authReducer";
import ordersReducer from "./ordersReducer";
import {
  categoriesReducer,
  categoriesProductsReducer,
} from "./categoryReducer";
import homeReducer from "./homeReducer";

export default combineReducers({
  product: productsReducer,
  auth: authReducer,
  orders: ordersReducer,
  categories: categoriesReducer,
  getProducts: getProductsReducer,
  home: homeReducer,
  categoryProducts: categoriesProductsReducer,
});
