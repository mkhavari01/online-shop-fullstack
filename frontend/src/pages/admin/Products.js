import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "redux/actions/productsActions";
import { Pagination } from "components/Pagination";
import { TableGrid } from "components/TableGrid";
import { DialogForm } from "components/DialogForm";
import { useEffect } from "react";
import { fetchCategories } from "redux/actions/categoryAction";

const Products = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <section className="container mt-4">
        {/* <DialogForm /> */}
        <div className="d-flex  align-items-center justify-content-between">
          {/* <Button variant="contained" className="mb-4" color="success"> */}
          {/* <span className=" vazir-medium" >
              افزودن کالا 
            </span> */}
          <DialogForm
            btnName={"افزودن کالا"}
            headerTitle={"افزودن / ویرایش کالا"}
          />
          {/* </Button> */}
          <h1 className="h1 vazir-bold text-end mb-5 text-primary p-2 rounded px-4">
            مدیریت کالاها
          </h1>
        </div>
        <TableGrid
          headers={["", "دسته بندی", "نام کالا", "تصویر"]}
          state={state.products}
          categories={state.categories}
          bodyItems={["category", "name", "productImage", ""]}
        />
        {/* <Pagination
          actionFunc={fetchProducts(1, 3)}
          pageNumbers={6}
          pageLimitation={4}
        /> */}
      </section>
    </>
  );
};

export { Products };
