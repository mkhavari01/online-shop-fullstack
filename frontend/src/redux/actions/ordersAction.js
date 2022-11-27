import { ordersApi } from "api/orders.api";
import axios from "axios";
import { FETCH_ORDERS } from "./types";

export const fetchOrders =
  (page = 0, limit = 10, delivered = false) =>
  (dispatch) => {
    ordersApi
      .gets("", `page=${page}&limit=${limit}&delivered=${delivered}`)
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
