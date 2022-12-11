import { toast } from "react-toastify";
import * as types from "./types";

const fetchCart = () => (dispatch) => {
  const data = JSON.parse(localStorage.getItem("cart")) || [];
  dispatch({
    type: types.FETCH_CART,
    payload: data,
  });
};

const addToCart = (object, quantity) => (dispatch) => {
  let data = JSON.parse(localStorage.getItem("cart")) || [];
  let oldData = data.find((el) => el._id === object._id);
  data = data.filter((el) => el._id !== object._id);
  if (oldData) {
    object.quantity = Number(oldData.quantity) + Number(quantity);
    object.finalPrice = Number(object.quantity) * Number(object.price);
  } else {
    object.quantity = quantity;
    object.finalPrice = Number(quantity) * Number(object.price);
  }
  dispatch({
    type: types.ADD_TO_CART,
    payload: JSON.stringify([...data, object]),
  });
  toast.success("محصول با موفقیت اضافه گردید");
};

const deleteFromCart = (id) => (dispatch) => {
  if (window.confirm("آیا از حذف محصول مطمعن هستید؟")) {
    let data = JSON.parse(localStorage.getItem("cart")) || [];
    let newData = data.filter((el) => el._id !== id);
    dispatch({
      type: types.DELETE_FROM_CART,
      payload: JSON.stringify(newData),
    });
  }
};

export { fetchCart, addToCart, deleteFromCart };
