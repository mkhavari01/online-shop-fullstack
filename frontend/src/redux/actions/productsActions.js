import axios from "axios";
import { FETCH_PRODUCTS, POST_PRODUCT } from "./types";
import { productsApi } from "api/products.api";

export const fetchProducts = (page, limit) => (dispatch) => {
  productsApi
    .gets(`?_page=${page}&_limit=${limit}`)
    .then((res) => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const postProduct = (requestOptions) => (dispatch) => {
  axios(`${process.env.REACT_APP_BACKEND_URL}` + `/products`, requestOptions)
    .then((res) => {
      dispatch({
        type: POST_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
