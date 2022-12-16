import { Card } from "components/Card";
import Sidebar from "components/Sidebar";
import { Layout } from "layout/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCategories,
  fetchCategoryProducts,
} from "redux/actions/categoryAction";

const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const { categories, categoryProducts } = state;

  useEffect(() => {
    dispatch(fetchCategoryProducts(id));
    dispatch(fetchCategories());
  }, [id, dispatch]);

  return (
    <>
      <Layout />
      <section className="d-flex flex-sm-row flex-column dir">
        <div id="sidebar" className="w-sm-auto w-full flex-wrap">
          <Sidebar />
        </div>
        <section className="d-flex flex-wrap dir w-100 w-sm-85 justify-content-center">
          {categoryProducts?.map((el) => {
            return <Card key={el._id} item={el} categories={categories} />;
          })}
        </section>
      </section>
    </>
  );
};

export { Category };
