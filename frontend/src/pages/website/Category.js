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
      <section className="d-flex dir">
        <div id="sidebar" className="">
          <Sidebar />
        </div>
        <section className="d-flex flex-wrap dir w-85">
          {categoryProducts?.map((el) => {
            return <Card key={el._id} item={el} categories={categories} />;
          })}
        </section>
      </section>
    </>
  );
};

export { Category };
