import { Layout } from "layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "redux/actions/productsActions";
import { TableGrid } from "components/TableGrid";
import { DialogForm } from "components/DialogForm";
import { useEffect, useState } from "react";
import { fetchCategories } from "redux/actions/categoryAction";
import { Offset2 } from "components/Offset2";
import Pagination2 from "components/Pagination2";
import { Loader } from "components/Loader";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";

const testData = [
  {
    name: "test name",
    price: 20000,
    quantity: 10,
  },
  {
    name: "test name2",
    price: 10000,
    quantity: 5,
  },
  {
    name: "test name3",
    price: 80000,
    quantity: 2,
  },
];
const Cart = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");

  const state = useSelector((state) => state);
  const { getProducts } = state;
  const { loading, error, products } = getProducts;

  useEffect(() => {
    dispatch(fetchProducts(page, limit));
    dispatch(fetchCategories());
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(fetchProducts(1, limit));
  }, [limit]);
  return (
    <>
      <Layout />
      <section className="container mt-4">
        <div className="d-flex  align-items-center justify-content-between">
          <div></div>
          <h1 className="h1 vazir-bold text-end mb-5 text-primary p-2 rounded px-4 bg-primary text-white">
            <AddShoppingCartIcon style={{ fontSize: "60px" }} />
            سبد خرید
          </h1>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <h3 className="error-text">{error}</h3>
        ) : (
          <>
            <TableGrid
              page="cart"
              headers={[" ", "تعداد", "قیمت", "نام کالا"]}
              state={testData || []}
              categories={state.categories}
              bodyItems={["quantity", "price", "name"]}
            />
            <div className="d-flex justify-content-between mt-5">
              <Link to="/cart">
                <Button variant="contained" color="success">
                  <span className="vazir-medium">تکمیل خرید</span>
                  <PaymentIcon />
                </Button>
              </Link>
              <h1 className="font24 vazir-medium">جمع : 1,345,678 تومان </h1>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export { Cart };
