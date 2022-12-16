import ErrorIMG from "assets/img/error-img.jpg";
import { Layout } from "layout/Layout";

const Error = () => {
  return (
    <>
      <Layout></Layout>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5 text-center">
        <h1>نتیجه پرداخت</h1>
        <img src={ErrorIMG} />
        <p className="mx-5">
          پرداخت موفقیت آمیز نبود , سفارش شما در انتظار پرداخت میباشد{" "}
        </p>
      </div>
    </>
  );
};

export { Error };
