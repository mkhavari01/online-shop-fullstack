import { Link } from "react-router-dom";
import { toPersianNumber } from "utils/toPersianNmber";
import "../assets/css/card.css";
const Card = ({ item, categories }) => {
  return (
    <div
      className="card dir d-flex justify-content-between align-items-center flex-column m-4"
      style={{ width: "300px", height: "500px" }}
    >
      <img
        width={200}
        height={item?.productImage ? null : "200px"}
        src={process.env.REACT_APP_BACKEND_URL + "/" + item?.productImage}
        className="mt-2"
      />
      <div
        className="d-flex flex-column justify-content-evenly w-100"
        style={{ flex: 1 }}
      >
        <h4 className="mt-4  text-center h5 vazir-bold">{item?.name}</h4>
        <div className="d-flex flex-row-reverse justify-content-around w-100 flex-wrap">
          <span className="p-3 font14 vazir-medium">
            {toPersianNumber(item?.price)} تومان
          </span>
          <span className="p-3 font14 vazir-medium">
            {categories?.[item?.category]?.name}
          </span>
        </div>
      </div>
      <Link
        to={"/product/" + item._id}
        className="detail bg-primary text-white pt-1 pb-1 no-style"
      >
        جزییات
      </Link>
    </div>
  );
};

export { Card };
