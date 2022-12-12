import { Layout } from "layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { TableGrid } from "components/TableGrid";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import { fetchCart } from "redux/actions/cartAction";
import { toPersianNumber } from "utils/toPersianNmber";

const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart } = state;
  const finalPrice = cart?.map((el) => el.finalPrice);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

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
        <>
          <TableGrid
            page="cart"
            headers={[" ", "تعداد", "قیمت", "نام کالا"]}
            state={cart || []}
            categories={state.categories}
            bodyItems={["quantity", "price", "name"]}
          />
          <div className="d-flex flex-column-reverse flex-md-row justify-content-between mt-5 align-items-center">
            <Link to="/order">
              <Button variant="contained" color="success">
                <span className="vazir-medium">تکمیل خرید</span>
                <PaymentIcon />
              </Button>
            </Link>
            <h1 className="font24 vazir-medium mb-4">
              جمع :{" "}
              {toPersianNumber(
                finalPrice.reduce((partialSum, a) => partialSum + a, 0)
              )}{" "}
              تومان{" "}
            </h1>
          </div>
        </>
      </section>
    </>
  );
};

export { Cart };
