import { useSelector } from "react-redux";
import { fetchOrders } from "redux/actions/ordersAction";
import { TableGrid } from "components/TableGrid";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Pagination2 from "components/Pagination2";
import { Offset2 } from "components/Offset2";
import { FilterOrder } from "components/FilterHandler";
import { Loader } from "components/Loader";

const Orders = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const [status, setStatus] = useState("false");

  const state = useSelector((state) => state?.orders);
  const { loading, error, orders } = state;

  useEffect(() => {
    dispatch(fetchOrders(page, limit, status));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(fetchOrders(1, limit, status));
  }, [limit, status]);

  return (
    <section className="container mt-4">
      <div className="d-flex align-items-center justify-content-between">
        <FilterOrder status={status} setStatus={setStatus} />
        <h1 className="h1 vazir-bold text-end mb-5 text-primary p-2 rounded px-4">
          مدیریت سفارش ها
        </h1>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <h3 className="error-text">{error}</h3>
      ) : (
        <>
          <TableGrid
            page="orders"
            headers={["", "زمان ثبت سفارش", "مجموع مبلغ", "نام کاربر"]}
            state={state?.orders?.data || []}
            bodyItems={["createdAt", "totalPrice", "name"]}
          />
          <div className="d-flex justify-content-between">
            <Pagination2
              page={orders?.page}
              pages={orders?.pages}
              changePage={setPage}
            />
            <Offset2 changeOffset={setLimit} offset={orders?.count} />
          </div>
        </>
      )}
    </section>
  );
};

export { Orders };
