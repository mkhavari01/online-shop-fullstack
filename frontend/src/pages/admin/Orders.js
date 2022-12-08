import { useSelector } from "react-redux";
import { fetchOrders } from "redux/actions/ordersAction";
import { Pagination } from "components/Pagination";
import { TableGrid } from "components/TableGrid";
import { Offset } from "components/Offset";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination2 from "components/Pagination2";
import { Offset2 } from "components/Offset2";
import { FilterOrder } from "components/FilterHandler";

const Orders = (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const [status, setStatus] = useState("false");

  const state = useSelector((state) => state?.orders);
  const { loading, error, orders } = state;
  console.log(orders);

  useEffect(() => {
    dispatch(fetchOrders(page, limit, status));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(fetchOrders(1, limit, status));
  }, [limit, status]);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  // const [status, setStatus] = useState("pending");

  // const [page, setPage] = useState(+searchParams.get("page") || 0);
  // const [offset, setOffset] = useState(+searchParams.get("limit") || 20);

  // const passPageState = (number) => {
  //   setPage(number);
  // };
  // const passOffsetState = (number) => {
  //   setOffset(number);
  //   setPage(0);
  // };

  // function filterHandler(e) {
  //   setStatus(e.target.value);
  // }

  // useEffect(() => {
  //   status === "pending"
  //     ? dispatch(fetchOrders(page, offset, false))
  //     : dispatch(fetchOrders(page, offset, true));
  //   navigate(`/admin/orders?page=${page}&limit=${offset}&delivered=${status}`);
  // }, [page, offset, status]);

  return (
    <section className="container mt-4">
      <div className="d-flex align-items-center justify-content-between">
        <FilterOrder status={status} setStatus={setStatus} />
        <h1 className="h1 vazir-bold text-end mb-5 text-primary p-2 rounded px-4">
          مدیریت سفارش ها
        </h1>
      </div>
      {loading ? (
        <h3 className="loading-text">Loading...</h3>
      ) : error ? (
        <h3 className="error-text">{error}</h3>
      ) : (
        <>
          <TableGrid
            page="orders"
            headers={["", "زمان ثبت سفارش", "مجموع مبلغ", "نام کاربر"]}
            state={state?.orders?.data || []}
            bodyItems={["time", "totalPrice", "username"]}
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
