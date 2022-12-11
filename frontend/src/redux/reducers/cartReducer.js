import { FETCH_CART, ADD_TO_CART, DELETE_FROM_CART } from "../actions/types";

const initialState = JSON.parse(localStorage.getItem("cart"));

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART:
      return action.payload;
    case ADD_TO_CART:
      localStorage.setItem("cart", action.payload);
      return state;
    case DELETE_FROM_CART:
      localStorage.setItem("cart", action.payload);
      return JSON.parse(action.payload);
    default:
      return state;
  }
};

export default cartReducer;
