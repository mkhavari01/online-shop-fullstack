import axios from "axios";
import { FETCH_CATEGORY } from "./types";
import { categoryApi } from "api/category.api";

export const fetchCategories = (page, limit) => (dispatch) => {
  categoryApi
    .gets()
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
