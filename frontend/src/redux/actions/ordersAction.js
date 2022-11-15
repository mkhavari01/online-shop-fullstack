import axios from "axios";
import { FETCH_ORDERS } from "./types";

export const fetchOrders =
  (page = 1, limit = 1, delivered) =>
  (dispatch) => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}` +
          `/orders?page=${page}&limit=${limit}`
      )
      .then((res) => {
        dispatch({
          type: FETCH_ORDERS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
