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

const Orders = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [status, setStatus] = useState("pending");

  const [page, setPage] = useState(+searchParams.get("page") || 0);
  const [offset, setOffset] = useState(+searchParams.get("limit") || 20);
  const passPageState = (number) => {
    setPage(number);
  };
  const passOffsetState = (number) => {
    setOffset(number);
    setPage(0);
  };

  function filterHandler(e) {
    navigate(
      `/admin/orders?page=${page}&limit=${offset}&deliverd=${e.target.value}`
    );
    setStatus(e.target.value);

    e.target.value == "pending"
      ? dispatch(fetchOrders(0, offset, false))
      : dispatch(fetchOrders(0, offset, true));
  }

  useEffect(() => {
    // console.log("page is ", page);
    dispatch(fetchOrders(page, offset));
    navigate(`/admin/orders?page=${page}&limit=${offset}&deliverd=${status}`);
  }, [dispatch, page, offset]);

  return (
    <section className="container mt-4">
      <div className="d-flex align-items-center justify-content-between">
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={status}
            onChange={filterHandler}
          >
            <FormControlLabel
              value={"pending"}
              control={<Radio />}
              label="سفارش های در انتظار ارسال"
            />
            <FormControlLabel
              value={"delivered"}
              control={<Radio />}
              label="سفارش های تحویل شده"
            />
          </RadioGroup>
        </FormControl>
        <h1 className="h1 vazir-bold text-end mb-5 text-primary p-2 rounded px-4">
          مدیریت سفارش ها
        </h1>
      </div>
      <TableGrid
        page="orders"
        headers={["", "زمان ثبت سفارش", "مجموع مبلغ", "نام کاربر"]}
        state={state?.orders?.data || []}
        bodyItems={["time", "totalPrice", "name"]}
      />
      <div className="align-items-center d-flex justify-content-around">
        <Pagination
          actionFunc={fetchOrders}
          pageNumbers={Math.ceil(state.orders?.metadata?.total / offset) || 10}
          offset={offset}
          passPageState={passPageState}
        />
        <Offset currentOffset={offset} passOffsetState={passOffsetState} />
      </div>
    </section>
  );
};

export { Orders };
