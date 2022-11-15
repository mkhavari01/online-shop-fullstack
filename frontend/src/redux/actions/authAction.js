import axios from "axios";
import { SIGN_UP, CHECK_TOKEN } from "./types";

export const signUp = (user) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/login`, user)
    .then((res) => {
      console.log("res is ", res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", user.username);
      localStorage.setItem("password", user.password);
      dispatch({
        type: SIGN_UP,
        payload: {
          token: res.data.token,
          username: user.username,
          password: user.password,
          checkToken: true,
        },
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const checkToken = (user) => (dispatch) => {
  axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, user).then((res) => {
    if (res.data.token) {
      dispatch({
        type: CHECK_TOKEN,
        payload: true,
      });
    } else {
      localStorage.setItem("token", "");
      localStorage.setItem("username", "");
      localStorage.setItem("password", "");
      dispatch({
        type: CHECK_TOKEN,
        payload: false,
      });
    }
  });
};
