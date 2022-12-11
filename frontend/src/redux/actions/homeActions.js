import { homeApi } from "api/home.api";
import { FETCH_FAVORITE } from "./types";

const fetchFavorite = () => (dispatch) => {
  homeApi
    .gets()
    .then((res) => {
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
