import axios from "axios";
import { FETCH_ORDERS } from "./types";

export const fetchOrders = (page, limit, delivered) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}` + `/orders`)
    .then((res) => {
      console.log("res in fetch orders is ", res);
      dispatch({
        type: FETCH_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
