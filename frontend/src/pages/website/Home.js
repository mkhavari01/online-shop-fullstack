import { Card } from "components/Card";
import { Layout } from "layout/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "redux/actions/categoryAction";
import { fetchFavorite } from "redux/actions/homeActions";
import { v4 } from "uuid";
const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { home, categories } = state;

  console.log("home", home);

  useEffect(() => {
    dispatch(fetchFavorite());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Layout />
      {home?.map((el) => {
        return (
          <section className="dir m-5" key={v4()}>
            <Link className="no-style" to={`/category/${el?.[0]?.category}`}>
              <h1>{categories?.[el?.[0]?.category]?.name}</h1>
            </Link>
            <div className="d-flex flex-wrap">
              {el?.map((el2) => {
                return <Card key={v4()} item={el2} categories={categories} />;
              })}
            </div>
          </section>
        );
      })}
    </>
  );
};

export { Home };
