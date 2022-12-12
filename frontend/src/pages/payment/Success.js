import { ordersApi } from "api/orders.api";
import { useEffect } from "react";
import { toast } from "react-toastify";
const Success = () => {
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("cartInfo"));
    if (data) {
      data["products"] = JSON.parse(localStorage.getItem("cart"));
      console.log("in here we call post action to set data in backend", data);
      ordersApi
        .post(data)
        .then((res) => {
          localStorage.removeItem("cart");
          localStorage.removeItem("cartInfo");
          toast.success("سفارش شما با موفقیت ثبت شد");
        })
        .catch((error) => {
          toast.error("متاسفانه به مشکلی برخوردیم!");
          console.log("error", error);
        });
    }
  }, []);

  return (
    <>
      <h1>Success page</h1>
    </>
  );
};

export { Success };
