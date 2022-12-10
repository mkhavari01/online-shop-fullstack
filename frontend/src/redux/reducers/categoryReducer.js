import { FETCH_CATEGORY, FETCH_CATEGORY_PRODUCTS } from "../actions/types";

const initialState = [];

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORY:
      return [...action.payload];
    default:
      return state;
  }
}

function categoriesProductsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORY_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
}

export { categoriesProductsReducer, categoriesReducer };
