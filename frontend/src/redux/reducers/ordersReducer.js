import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
} from "../actions/types";

const initialState = [];

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return {
        loading: true,
        orders: [],
      };
    case GET_ORDERS_SUCCESS:
      return {
        orders: action.payload,
        loading: false,
      };
    case GET_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
