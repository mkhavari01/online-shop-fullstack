import { Card } from "components/Card";
import { Layout } from "layout/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const x = [
  {
    name: "name",
    description: "desc",
    price: "120,000",
    grouping: "عطر و خوشبویی",
    productImage: "uploads//1669242836155ME.jpg",
  },
];
const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.products);

  useEffect(() => {
    dispatch();
  }, [dispatch]);

  return (
    <>
      <Layout />
      <section className="dir m-5">
        <h1>کالاهای گروه لبنیات</h1>
        <div className="d-flex flex-wrap">
          {x.map((el) => {
            return <Card item={el} />;
          })}
        </div>
      </section>
    </>
  );
};

export { Home };
