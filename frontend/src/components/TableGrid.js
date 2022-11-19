import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { ordersApi } from "api/orders.api";
import { useEffect, useRef, useState } from "react";
import { InputOrText } from "./InputOrText";

import { OrderModal } from "./OrderModal";

const TableGrid = ({
  headers,
  bodyItems,
  state,
  page,
  datas,
  setDatas,
  flag,
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  // const [datas, setDatas] = useState([]);

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
      <thead className="text-end">
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
      <tbody className="text-end">
        {state.map((el) => {
          return (
            <tr key={el._id}>
              {page == "orders" ? (
                <th scope="col">
                  <Button variant="text" onClick={() => openModal(el._id)}>
                    <span className="vazir-medium">بررسی سفارش</span>
                  </Button>{" "}
                </th>
              ) : page === "entity" ? null : (
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
                ) : el2 === "price" || el2 === "stock" ? (
                  <th key={el2} scope="col">
                    {/* {el[el2]} */}
                    <InputOrText
                      valueProp={el[el2]}
                      id={el._id}
                      field={el2}
                      datas={datas}
                      setDatas={setDatas}
                      flag={flag}
                    />
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
