import * as types from "../actions/types";

const initialState = [];
let copyState;
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PRODUCT_REQ:
      return {
        loading: true,
        product: [],
      };
    case types.FETCH_PRODUCT_RES:
      return {
        product: action.payload,
        loading: false,
      };
    case types.FETCH_PRODUCT_ERR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const getProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PATCH_ENTITY:
      return state;
    case types.DELETE_PRODUCT:
      return {
        ...state,
        products: {
          ...state.products,
          data: state.products.data.filter((el) => el._id !== action.payload),
        },
      };
    case types.POST_PRODUCT:
      return {
        ...state,
        products: {
          ...state.products,
          data: [action.payload, ...state.products.data],
        },
      };
    case types.PATCH_PRODUCT:
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
    case types.GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        products: action.payload,
        loading: false,
      };
    case types.GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
