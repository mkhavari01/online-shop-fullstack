import axios from "axios";
import { FETCH_CATEGORY } from "./types";

export const fetchCategories = (page, limit) => dispatch => {
  axios.get(`${process.env.REACT_APP_BACKEND_URL}` + `/groups`).then((res) => {
    console.log('res in fetch category',res)
    dispatch({
      type: FETCH_CATEGORY,
      payload: res.data
    })
  }).catch((err) => {
    console.log(err.message)
  })
}