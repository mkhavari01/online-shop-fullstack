import { SIGN_UP,CHECK_TOKEN } from "../actions/types"

const initialState = {
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
  password : localStorage.getItem('password'),
  checkToken : false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        username: action.payload.username,
        password : action.payload.password,
        token: action.payload.token,
        checkToken: action.payload.checkToken,
      }
    case CHECK_TOKEN:
      return {
        ...state,
        checkToken : action.payload
      }
    default:
      return state
  }
}

export default authReducer