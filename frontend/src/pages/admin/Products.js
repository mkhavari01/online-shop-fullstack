import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "redux/actions/productsActions";
import { TableGrid } from "components/TableGrid";
import { DialogForm } from "components/DialogForm";
import { useEffect, useState } from "react";
import { fetchCategories } from "redux/actions/categoryAction";

import Pagination2 from "components/Pagination2";
const Products = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const state = useSelector((state) => state);
  const { getProducts } = state;
  const { loading, error, products } = getProducts;

  useEffect(() => {
    dispatch(fetchProducts(page, 20));
    dispatch(fetchCategories());
  }, [dispatch, page]);

  return (
    <>
      <section className="container mt-4">
        <div className="d-flex  align-items-center justify-content-between">
          <DialogForm
            btnName={"افزودن کالا"}
            headerTitle={"افزودن / ویرایش کالا"}
          />
          <h1 className="h1 vazir-bold text-end mb-5 text-primary p-2 rounded px-4">
            مدیریت کالاها
          </h1>
        </div>
        {loading ? (
          <h3 className="loading-text">Loading...</h3>
        ) : error ? (
          <h3 className="error-text">{error}</h3>
        ) : (
          <>
            <TableGrid
              headers={["", "دسته بندی", "نام کالا", "تصویر"]}
              state={products?.data || []}
              categories={state.categories}
              bodyItems={["category", "name", "productImage", ""]}
            />
            <Pagination2
              page={products?.page}
              pages={products?.pages}
              changePage={setPage}
            />
          </>
        )}
      </section>
    </>
  );
};

export { Products };
