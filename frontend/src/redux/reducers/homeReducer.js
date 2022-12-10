import { FETCH_FAVORITE } from "../actions/types";

const initialState = [];

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVORITE:
      return action.payload;
    default:
      return state;
  }
};

export default homeReducer;
