import { FETCH_PRODUCTS, PATCH_PRODUCT, POST_PRODUCT } from "../actions/types";

const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return [...action.payload];
    case POST_PRODUCT:
      return [...state, action.payload];
    case PATCH_PRODUCT:
      let newState = state.map((el) => {
        if (el._id == action.payload._id) {
          return action.payload;
        }
        return el;
      });
      return [...newState];
    default:
      return state;
  }
}
