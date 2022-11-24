import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { ordersApi } from "api/orders.api";
import { productsApi } from "api/products.api";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "redux/actions/productsActions";
import { InputOrText } from "./InputOrText";
import { toast } from "react-toastify";
import { OrderModal } from "./OrderModal";
import { DialogForm } from "./DialogForm";

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
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [openProduct, setOpenProduct] = useState(false);
  const dispatch = useDispatch();

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

  function deleteHandler(id) {
    productsApi
      .delete(id)
      .then((res) => {
        toast.success("محصول شما با موفقیت حذف شد");
        dispatch(fetchProducts());
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("متاسفانه به مشکلی یرخوردیم!");
      });
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
                    <span
                      className="vazir-medium"
                      onClick={() => deleteHandler(el._id)}
                    >
                      حذف
                    </span>
                  </Button>
                  <Button variant="text">
                    <span
                      className="vazir-medium"
                      onClick={() => openModalEdit(el._id)}
                    >
                      ویرایش
                    </span>
                  </Button>
                </th>
              )}
              {bodyItems.map((el2) => {
                return el2 == "productImage" ? (
                  <th key={el2} scope="col">
                    <Avatar
                      alt="N/A"
                      src={`${
                        process.env.REACT_APP_BACKEND_URL + "/" + el[el2]
                      }`}
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
                ) : el2 === "category" ? (
                  <th key={el2} scope="col">
                    {categories[el[el2]]?.name}
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
