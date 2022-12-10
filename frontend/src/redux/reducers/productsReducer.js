import {
  FETCH_PRODUCTS,
  PATCH_PRODUCT,
  POST_PRODUCT,
  PATCH_ENTITY,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  DELETE_PRODUCT,
} from "../actions/types";

const initialState = [];
let copyState;
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;
    case POST_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
}

export const getProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATCH_ENTITY:
      return state;
    case DELETE_PRODUCT:
      return {
        ...state,
        products: {
          ...state.products,
          data: state.products.data.filter((el) => el._id !== action.payload),
        },
      };
    case POST_PRODUCT:
      return {
        ...state,
        products: {
          ...state.products,
          data: [action.payload, ...state.products.data],
        },
      };
    case PATCH_PRODUCT:
      copyState = state.products.data.map((el) => {
        if (el._id == action.payload._id) {
          return action.payload;
        }
        return el;
      });
      return {
        ...state,
        products: { ...state.products, data: copyState },
      };
    case GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        products: action.payload,
        loading: false,
      };
    case GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
