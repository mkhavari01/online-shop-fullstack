import { Button, TextField } from "@mui/material";
import { Loader } from "components/Loader";
import { Layout } from "layout/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "redux/actions/categoryAction";
import { fetchProduct } from "redux/actions/productsActions";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { addToCart } from "redux/actions/cartAction";
import { toPersianNumber } from "utils/toPersianNmber";

const { useParams } = require("react-router-dom");
const min = 1;
const DetailProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [textField, setTextField] = useState(1);

  const { categories, product } = state;
  const { loading, error } = product;

  function changeInput(e) {
    let value = parseInt(e.target.value, 10);
    if (value < min) value = min;
    setTextField(value);
  }

  useEffect(() => {
    dispatch(fetchProduct(id));
    dispatch(fetchCategories());
  }, []);
  return (
    <>
      <Layout />
      {loading ? (
        <Loader />
      ) : error ? (
        <h3 className="error-text">{error}</h3>
      ) : (
        <>
          <section className="dir d-md-flex m-md-5">
            <img
              src={
                process.env.REACT_APP_BACKEND_URL +
                "/" +
                product?.product?.productImage
              }
            />
            <div className="d-flex flex-column justify-content-around align-items-center align-items-md-start mt-md-0 my-4 mx-md-5">
              <h3 className="font20 vazir-bold">{product?.product?.name}</h3>
              <h4 className="font16 vazir-medium">
                <span className="font16 vazir-medium">گروه:</span>{" "}
                {categories[product?.product?.category]?.name}
              </h4>
              <h2 className="vazir-bold font16">
                <span className="vazir-medium font16">قیمت:</span>{" "}
                {toPersianNumber(product?.product?.price)}{" "}
                <span className="vazir-bold font16">تومان</span>
              </h2>
              <div className="d-flex align-items-base justify-content-center">
                <TextField
                  type="number"
                  label=" لطفا به عدد"
                  InputLabelProps={{
                    shrink: true,
                    max: 100,
                    min: 10,
                  }}
                  value={textField}
                  onChange={(e) => changeInput(e)}
                  style={{ width: "100px" }}
                />
                <Button
                  className="text-white vazir-medium mb-4 mt-1 mx-3"
                  variant="contained"
                  color="success"
                  onClick={() => {
                    dispatch(addToCart(product?.product, textField));
                    setTextField(1);
                  }}
                >
                  <LibraryAddIcon className="m-1" />
                  افزودن به سبد خرید
                </Button>
              </div>
            </div>
          </section>
          <p className="dir font14 vazir-medium pt-3 px-3 w-md-50 text-right">
            {product?.product?.description}
          </p>
        </>
      )}
    </>
  );
};

export { DetailProduct };
