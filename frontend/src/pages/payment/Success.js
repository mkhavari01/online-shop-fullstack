import { ordersApi } from "api/orders.api";
import { Layout } from "layout/Layout";
import { useEffect } from "react";
import { toast } from "react-toastify";
import SuccessIMG from "assets/img/success-img.jpg";
const Success = () => {
  // useEffect(() => {
  //   let data = JSON.parse(localStorage.getItem("cartInfo"));
  //   if (data) {
  //     data["products"] = JSON.parse(localStorage.getItem("cart"));
  //     console.log("in here we call post action to set data in backend", data);
  //     ordersApi
  //       .post(data)
  //       .then((res) => {
  //         localStorage.removeItem("cart");
  //         localStorage.removeItem("cartInfo");
  //         toast.success("سفارش شما با موفقیت ثبت شد");
  //       })
  //       .catch((error) => {
  //         toast.error("متاسفانه به مشکلی برخوردیم!");
  //         console.log("error", error);
  //       });
  //   }
  // }, []);

  return (
    <>
      <Layout />
      <div className="d-flex flex-column justify-content-center align-items-center mt-5 text-center">
        <h1>نتیجه پرداخت</h1>
        <img src={SuccessIMG} />
        <p className="mx-5">
          با تشکر از پرداخت شما , سفارش شما ثبت شده و جهت هماهنگی ارسال با شما
          تماس گرفته خواهد شد{" "}
        </p>
      </div>
    </>
  );
};

export { Success };
