import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, patchEntity } from "redux/actions/productsActions";
import { TableGrid } from "components/TableGrid";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Offset2 } from "components/Offset2";
import Pagination2 from "components/Pagination2";
import { Loader } from "components/Loader";
import { toast } from "react-toastify";

const Entity = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");

  const state = useSelector((state) => state);
  const { getProducts } = state;
  const { loading, error, products } = getProducts;

  const [flag, setFlag] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts(page, limit));
    localStorage.removeItem("sent");
  }, [dispatch, page, flag]);

  useEffect(() => {
    dispatch(fetchProducts(1, limit));
    localStorage.removeItem("sent");
  }, [limit]);

  function handleSave() {
    let local = JSON.parse(localStorage.getItem("sent"));
    if (!local?.[0]) {
      toast.info("شما موردی را هنوز تغییر نداده اید");
    } else {
      let newData = local.map((el) => {
        return {
          [el.field]: el.ref,
          id: el.id,
        };
      });
      console.log("we r sending ", newData);
      dispatch(patchEntity(newData));
      localStorage.removeItem("sent");
      setFlag(!flag);
    }
  }

  return (
    <section className="container mt-4">
      <div
        className={
          "d-flex align-items-center ${} mb-5 " +
          `${true ? "justify-content-between" : "justify-content-end"}`
        }
      >
        {true ? (
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
      {loading ? (
        <Loader />
      ) : error ? (
        <h3 className="error-text">{error}</h3>
      ) : (
        <>
          <TableGrid
            headers={["موجودی", "قیمت", "نام کالا"]}
            state={products?.data || []}
            bodyItems={["stock", "price", "name"]}
            page="entity"
            datas={datas}
            setDatas={setDatas}
            flag={flag}
          />
          <div className="d-flex justify-content-between">
            <Pagination2
              page={products?.page}
              pages={products?.pages}
              changePage={setPage}
            />
            <Offset2 changeOffset={setLimit} offset={products?.count} />
          </div>
        </>
      )}
    </section>
  );
};

export { Entity };
