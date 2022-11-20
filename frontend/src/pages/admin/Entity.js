import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "redux/actions/productsActions";
import { Pagination } from "components/Pagination";
import { TableGrid } from "components/TableGrid";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { productsApi } from "api/products.api";
import { toast } from "react-toastify";

const Entity = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [flag, setFlag] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, flag]);

  function handleSave() {
    let newData = datas.map((el) => {
      return {
        [el.field]: el.ref.current.getElementsByTagName("input")[0].value,
        id: el.id,
      };
    });
    productsApi
      .patch("update", newData)
      .then((res) => {
        setDatas([]);
        setFlag(!flag);
        toast.success("تغییرات با موفقیت ثبت شد");
      })
      .catch((err) => {
        console.log("we have an error ", err);
        toast.error("متاسفانه به مشکلی برخوردیم!");
      });
  }

  return (
    <section className="container mt-4">
      <div
        className={
          "d-flex align-items-center ${} mb-5 " +
          `${datas[0] ? "justify-content-between" : "justify-content-end"}`
        }
      >
        {datas[0] ? (
          <Button
            variant="contained"
            className="vazir-bold"
            onClick={handleSave}
          >
            ذخیره
          </Button>
        ) : null}
        <h1 className="h1 vazir-bold text-end text-primary p-2 rounded px-4">
          مدیریت موجودی و قیمت ها
        </h1>
      </div>
      <TableGrid
        headers={["موجودی", "قیمت", "نام کالا"]}
        state={state.products}
        bodyItems={["stock", "price", "name"]}
        page="entity"
        datas={datas}
        setDatas={setDatas}
        flag={flag}
      />
      <Pagination
        actionFunc={fetchProducts(1, 4)}
        pageNumbers={3}
        pageLimitation={3}
      />
    </section>
  );
};

export { Entity };
