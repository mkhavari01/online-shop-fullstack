import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { ordersApi } from "api/orders.api";
import { productsApi } from "api/products.api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "redux/actions/productsActions";
import { InputOrText } from "./InputOrText";
import { OrderModal } from "./OrderModal";
import { DialogForm } from "./DialogForm";
import { v4 } from "uuid";
import { deleteFromCart } from "redux/actions/cartAction";
import { toPersianNumber } from "utils/toPersianNmber";
const TableGrid = ({
  headers,
  bodyItems,
  state,
  page,
  datas,
  setDatas,
  flag,
  categories,
}) => {
  const [passData, setPassData] = useState([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [openProduct, setOpenProduct] = useState(false);
  const dispatch = useDispatch();

  function openModal(id) {
    ordersApi
      .get(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(true);
  }

  function openModalEdit(id) {
    productsApi
      .get(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpenProduct(true);
  }

  return (
    <table className="table vazir-thin ">
      <thead className="text-end position-sticky top-0">
        <tr className="bg-primary">
          {headers.map((el) => {
            return (
              <th
                className="w-25 position-sticky top-0 text-white"
                key={v4()}
                scope="col"
              >
                {el}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="text-end">
        {state.map((el, index) => {
          return (
            <tr key={v4()}>
              {page == "orders" ? (
                <th scope="col" key={v4()} className="w-25">
                  <Button variant="text" onClick={() => openModal(el?._id)}>
                    <span className="vazir-medium">بررسی سفارش</span>
                  </Button>{" "}
                </th>
              ) : page === "entity" ? null : page === "cart" ? (
                <th scope="col" key={v4()} className="w-25">
                  <Button variant="text">
                    <span
                      className="vazir-medium"
                      onClick={() => dispatch(deleteFromCart(el?._id))}
                    >
                      حذف
                    </span>
                  </Button>
                </th>
              ) : (
                <th className="w-25" scope="col" key={v4()}>
                  <Button variant="text">
                    <span
                      className="vazir-medium"
                      onClick={() => dispatch(deleteProduct(el?._id))}
                    >
                      حذف
                    </span>
                  </Button>
                  <Button variant="text">
                    <span
                      className="vazir-medium"
                      onClick={() => openModalEdit(el?._id)}
                    >
                      ویرایش
                    </span>
                  </Button>
                </th>
              )}
              {bodyItems.map((el2, index) => {
                return el2 == "productImage" ? (
                  <th className="w-25" key={v4()} scope="col">
                    <Avatar
                      alt="N/A"
                      src={`${
                        process.env.REACT_APP_BACKEND_URL + "/" + el?.[el2]
                      }`}
                      // sx={{ width: 56, height: 56 }}
                    />
                  </th>
                ) : el2 == "time" ? (
                  <th className="w-25" key={v4()}>
                    {new Date(el[el2]).toLocaleString("fa-IR", {
                      year: "numeric",
                      day: "numeric",
                      month: "long",
                    })}
                  </th>
                ) : el2 === "price" || el2 === "stock" ? (
                  page !== "cart" ? (
                    <th className="w-25" key={v4()} scope="col">
                      <InputOrText
                        valueProp={el?.[el2]}
                        id={el?._id}
                        field={el2}
                        datas={datas}
                        setDatas={setDatas}
                        flag={flag}
                        passData={passData}
                        setPassData={setPassData}
                      />
                    </th>
                  ) : (
                    <th className="w-25" key={v4()} scope="col">
                      {toPersianNumber(el?.[el2])}
                    </th>
                  )
                ) : el2 === "category" ? (
                  <th className="w-25" key={v4()} scope="col">
                    {categories[el[el2]]?.name}
                  </th>
                ) : el2 === "deliverTime" ? (
                  <th className="w-25" key={v4()} scope="col">
                    {new Date(el?.[el2]).toLocaleString("fa-ir", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </th>
                ) : el2 === "totalPrice" ? (
                  <th className="w-25" key={v4()} scope="col">
                    {toPersianNumber(el?.[el2])}
                  </th>
                ) : (
                  <th className="w-25" key={v4()} scope="col">
                    {el?.[el2]}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <OrderModal open={open} data={data} setOpen={setOpen} />
      <DialogForm
        mode="edit"
        headerTitle={"ویرایش کالا"}
        openProduct={openProduct}
        setOpenProduct={setOpenProduct}
        dataEdit={data}
      />
    </table>
  );
};

export { TableGrid };
