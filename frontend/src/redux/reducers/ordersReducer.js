import { FETCH_ORDERS } from "../actions/types";

const initialState = []

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS:
      return [
        ...action.payload
      ]
    default:
      return state
  }
}