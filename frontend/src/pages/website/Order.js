import { Layout } from "layout/Layout";
import { useRef } from "react";
const Order = () => {
  const refEl = useRef();

  function saveHandler() {
    localStorage.setItem(
      "cartInfo",
      JSON.stringify(Object.fromEntries(new FormData(refEl.current).entries()))
    );
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
              placeholder="مهدی خاوری"
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
              placeholder="09034604960"
              name="phone"
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
            placeholder="ایران تهران خ نبرد"
          ></textarea>
        </div>
        <button onClick={saveHandler} type="button" className="btn btn-success">
          پرداخت
        </button>
      </form>
    </>
  );
};

export { Order };
