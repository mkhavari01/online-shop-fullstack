import { DatePricker } from "components/DatePicker";
import { Layout } from "layout/Layout";
import { useRef, useState } from "react";
const Order = () => {
  const refEl = useRef();
  const [deliverTime, setDeliverTime] = useState(new Date().getTime());

  function saveHandler() {
    let data = Object.fromEntries(new FormData(refEl.current).entries());

    let totalPrice = JSON.parse(localStorage.getItem("cart"));
    totalPrice = totalPrice.map((el) => el.finalPrice);
    totalPrice = totalPrice.reduce((partialSum, a) => partialSum + a, 0);

    data["deliverTime"] = deliverTime;
    data["totalPrice"] = totalPrice;

    localStorage.setItem("cartInfo", JSON.stringify(data));
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/payment`;
  }

  return (
    <>
      <Layout />
      <form className="container mt-5 dir" action="/rr" ref={refEl}>
        <div className="mb-3 d-flex">
          <div className="w-50">
            <label htmlFor="name" className="form-label">
              نام و نام خانوادگی:
            </label>
            <input
              type="text"
              className="form-control w-75"
              id="name"
              defaultValue="مهدی خاوری"
              name="name"
            />
          </div>
          <div className="w-50">
            <label htmlFor="name" className="form-label ">
              شماره تلفن:
            </label>
            <input
              type="number"
              className="form-control w-75"
              id="name"
              name="phone"
              defaultValue={"09034604960"}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            آدرس:
          </label>
          <textarea
            name="address"
            className="form-control"
            id="address"
            rows="3"
            defaultValue={"ایران تهران خ نبرد"}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            زمان تحویل:
          </label>
          <DatePricker setDeliverTime={setDeliverTime} />
        </div>
        <button
          onClick={saveHandler}
          type="button"
          className="btn btn-success mt-3"
        >
          پرداخت
        </button>
      </form>
    </>
  );
};

export { Order };
