import { FETCH_CATEGORY } from "../actions/types";

const initialState = []

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORY:
      return [
        ...action.payload
      ]
    default:
      return state
  }
}