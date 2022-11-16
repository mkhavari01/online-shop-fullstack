import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { ordersApi } from "api/orders.api";
import { useState } from "react";

import { OrderModal } from "./OrderModal";

const TableGrid = ({ headers, bodyItems, state, page }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  function openModal(id) {
    ordersApi
      .get(id)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(true);
  }

  return (
    <table className="table vazir-thin ">
      <thead>
        <tr>
          {headers.map((el) => {
            return (
              <th key={el} scope="col">
                {el}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {state.map((el) => {
          return (
            <tr key={el._id}>
              {page == "orders" ? (
                <th scope="col">
                  <Button variant="text" onClick={() => openModal(el._id)}>
                    <span className="vazir-medium">بررسی سفارش</span>
                  </Button>{" "}
                </th>
              ) : (
                <th scope="col">
                  <Button variant="text">
                    <span className="vazir-medium">حذف</span>
                  </Button>
                  <Button variant="text">
                    <span className="vazir-medium">ویرایش</span>
                  </Button>
                </th>
              )}
              {bodyItems.map((el2) => {
                return el2 == "image" ? (
                  <th key={el2} scope="col">
                    <Avatar
                      alt="N/A"
                      src={`${process.env.REACT_APP_BACKEND_URL + el[el2]}`}
                      // sx={{ width: 56, height: 56 }}
                    />
                  </th>
                ) : el2 == "time" ? (
                  <th key={el2}>
                    {new Date(el[el2]).toLocaleString("fa-IR", {
                      year: "numeric",
                      day: "numeric",
                      month: "long",
                    })}
                  </th>
                ) : (
                  // <h1>{el[el2]}</h1>
                  <th key={el2} scope="col">
                    {el[el2]}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <OrderModal open={open} data={data} setOpen={setOpen} />
    </table>
  );
};

export { TableGrid };
