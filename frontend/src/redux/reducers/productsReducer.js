import {
  FETCH_PRODUCTS,
  PATCH_PRODUCT,
  POST_PRODUCT,
  PATCH_ENTITY,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
} from "../actions/types";

const initialState = [];
let copyState;
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;
    case POST_PRODUCT:
      return [...state, action.payload];
    // case PATCH_PRODUCT:
    //   console.log("state in here is", state, initialState);
    //   copyState = state.map((el) => {
    //     if (el._id == action.payload._id) {
    //       return action.payload;
    //     }
    //     return el;
    //   });
    //   return [...copyState];
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

export const getProductsReducer = (state = initialState, action) => {
  switch (action.type) {
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
      console.log("we r in here");
      return {
        loading: true,
        products: [],
      };
    case GET_PRODUCTS_SUCCESS:
      console.log("we r in here2 and the return is", {
        products: action.payload,
        loading: false,
      });
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
