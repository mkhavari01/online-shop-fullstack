import { Card } from "components/Card";
import { Layout } from "layout/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "redux/actions/categoryAction";
import { fetchFavorite } from "redux/actions/homeActions";

const x = [
  {
    name: "name",
    description: "desc",
    price: "120,000",
    grouping: "عطر و خوشبویی",
    productImage: "uploads//1669242836155ME.jpg",
    _id: "123",
  },
];
const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { home, categories } = state;

  useEffect(() => {
    dispatch(fetchFavorite(0));
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Layout />
      <section className="dir m-5">
        <h1>کالاهای گروه لبنیات</h1>
        <div className="d-flex flex-wrap">
          {home?.map((el) => {
            return <Card key={el._id} item={el} categories={categories} />;
          })}
        </div>
      </section>
    </>
  );
};

export { Home };
