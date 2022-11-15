import { FETCH_PRODUCTS, POST_PRODUCT } from "../actions/types";

const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return [...action.payload];
    case POST_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
}
