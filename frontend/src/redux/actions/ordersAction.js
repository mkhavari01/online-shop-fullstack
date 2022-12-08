import { ordersApi } from "api/orders.api";
import axios from "axios";
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
} from "./types";

export const fetchOrders =
  (page = 1, limit = 5, delivered = false) =>
  async (dispatch) => {
    // ordersApi
    //   .gets("", `page=${page}&limit=${limit}&delivered=${delivered}`)
    //   .then((res) => {
    //     dispatch({
    //       type: FETCH_ORDERS,
    //       payload: res.data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
    try {
      dispatch({ type: GET_ORDERS_REQUEST });
      const { data } = await ordersApi.gets(
        "",
        `page=${page}&limit=${limit}&delivered=${delivered}`
      );
      dispatch({
        type: GET_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ORDERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
