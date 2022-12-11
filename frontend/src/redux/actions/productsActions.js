import * as types from "./types";
import { productsApi } from "api/products.api";
import { toast } from "react-toastify";
import { entityApi } from "api/entity.api";

export const fetchProducts = (page, limit) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PRODUCTS_REQUEST });
    const { data } = await productsApi.gets("", `page=${page}&limit=${limit}`);
    dispatch({
      type: types.GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_PRODUCT_REQ });
    const { data } = await productsApi.get(id);
    dispatch({
      type: types.FETCH_PRODUCT_RES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_PRODUCT_ERR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postProduct = (requestOptions) => (dispatch) => {
  productsApi
    .post(requestOptions)
    .then((res) => {
      toast.success("محصول شما با موفقیت ایجاد شد");
      dispatch({
        type: types.POST_PRODUCT,
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
        type: types.PATCH_PRODUCT,
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
      toast.success("تغییرات با موفقیت ثبت شد");
      dispatch({
        type: types.PATCH_ENTITY,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("we have an error ", err);
      toast.error("متاسفانه به مشکلی برخوردیم!");
    });
};

export const deleteProduct = (id) => (dispatch) => {
  if (window.confirm("آیا از حذف محصول اطمینان دارید؟")) {
    productsApi
      .delete(id)
      .then((res) => {
        console.log("res", res.data);
        dispatch({
          type: types.DELETE_PRODUCT,
          payload: id,
        });
        toast.success("محصول شما با موفقیت حذف شد");
      })
      .catch((err) => {
        toast.error("متاسفانه به مشکلی یرخوردیم!");
      });
  }
};
