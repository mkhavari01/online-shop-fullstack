import {
  FETCH_PRODUCTS,
  PATCH_PRODUCT,
  POST_PRODUCT,
  PATCH_ENTITY,
} from "../actions/types";

const initialState = [];
let copyState;
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return [...action.payload];
    case POST_PRODUCT:
      return [...state, action.payload];
    case PATCH_PRODUCT:
      copyState = state.map((el) => {
        if (el._id == action.payload._id) {
          return action.payload;
        }
        return el;
      });
      return [...copyState];
    case PATCH_ENTITY:
      let count = 0;
      copyState = state.map((el, index) => {
        if (el._id == action.payload[count]?._id) {
          count += 1;
          return action.payload[count - 1];
        }
        return el;
      });
      return [...copyState];
    default:
      return state;
  }
}
