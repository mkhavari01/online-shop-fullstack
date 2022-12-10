import { homeApi } from "api/home.api";
import { FETCH_FAVORITE } from "./types";

const fetchFavorite = (id) => (dispatch) => {
  homeApi
    .gets("", `category=${id}`)
    .then((res) => {
      console.log("res is", res);
      dispatch({
        type: FETCH_FAVORITE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err is ", err);
    });
};

export { fetchFavorite };
