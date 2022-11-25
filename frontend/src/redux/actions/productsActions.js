import {
  FETCH_PRODUCTS,
  PATCH_PRODUCT,
  POST_PRODUCT,
  PATCH_ENTITY,
} from "./types";
import { productsApi } from "api/products.api";
import { toast } from "react-toastify";
import { entityApi } from "api/entity.api";

export const fetchProducts = (page, limit) => (dispatch) => {
  productsApi
    .gets(`?_page=${page}&_limit=${limit}`)
    .then((res) => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const postProduct = (requestOptions) => (dispatch) => {
  productsApi
    .post(requestOptions)
    .then((res) => {
      toast.success("محصول شما با موفقیت ایجاد شد");
      dispatch({
        type: POST_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast.error("متاسفانه به مشکلی برخوردیم!");
      console.log(err.message);
    });
};

export const patchProduct = (id, data) => (dispatch) => {
  productsApi
    .patch(id, data)
    .then((res) => {
      toast.success("تغییرات شما با موفقیت ثبت شد");
      dispatch({
        type: PATCH_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) => {
      toast.error("متاسفانه به مشکلی برخوردیم!");
      console.log(err.message);
    });
};

export const patchEntity = (data) => (dispatch) => {
  entityApi
    .update(data)
    .then((res) => {
      dispatch({
        type: PATCH_ENTITY,
        payload: res.data,
      });
      toast.success("تغییرات با موفقیت ثبت شد");
    })
    .catch((err) => {
      console.log("we have an error ", err);
      toast.error("متاسفانه به مشکلی برخوردیم!");
    });
};
