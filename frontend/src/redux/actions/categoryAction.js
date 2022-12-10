import axios from "axios";
import { FETCH_CATEGORY, FETCH_CATEGORY_PRODUCTS } from "./types";
import { categoryApi } from "api/category.api";

export const fetchCategories = (page, limit) => (dispatch) => {
  categoryApi
    .gets("", "query=none")
    .then((res) => {
      dispatch({
        type: FETCH_CATEGORY,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const fetchCategoryProducts = (id) => (dispatch) => {
  categoryApi
    .get(id)
    .then((res) => {
      dispatch({
        type: FETCH_CATEGORY_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
