import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, patchEntity } from "redux/actions/productsActions";
import { TableGrid } from "components/TableGrid";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Offset2 } from "components/Offset2";
import Pagination2 from "components/Pagination2";

const Entity = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("10");

  const state = useSelector((state) => state);
  const { getProducts } = state;
  const { loading, error, products } = getProducts;

  const [flag, setFlag] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts(page, limit));
  }, [dispatch, page, flag]);

  useEffect(() => {
    dispatch(fetchProducts(1, limit));
  }, [limit]);

  function handleSave() {
    let newData = datas.map((el) => {
      return {
        [el.field]: el.ref.current.getElementsByTagName("input")[0].value,
        id: el.id,
      };
    });
    dispatch(patchEntity(newData));
    setDatas([]);
    setFlag(!flag);
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
      {loading ? (
        <h3 className="loading-text">Loading...</h3>
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
