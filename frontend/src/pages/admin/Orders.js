import { useSelector } from "react-redux";
import { fetchOrders } from "redux/actions/ordersAction";
import { Pagination } from "components/Pagination";
import { TableGrid } from "components/TableGrid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Orders = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [status, setStatus] = useState("pending");

  function filterHandler(e) {
    setStatus(e.target.value);
    e.target.value == "pending"
      ? dispatch(fetchOrders(1, 4, false))
      : dispatch(fetchOrders(1, 4, true));
  }

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
        state={state.orders}
        bodyItems={["time", "totalPrice", "name"]}
      />
      <Pagination
        actionFunc={fetchOrders(1, 4, false)}
        pageNumbers={1}
        pageLimitation={1}
      />
    </section>
  );
};

export { Orders };
