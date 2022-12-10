import "../assets/css/card.css";
const Card = ({ item, categories }) => {
  return (
    <div
      className="card dir d-flex justify-content-between align-items-center flex-column m-4 p-4"
      style={{ width: "300px", height: "500px" }}
    >
      <img
        width={200}
        src={process.env.REACT_APP_BACKEND_URL + "/" + item.productImage}
      />
      <div
        className="d-flex flex-column justify-content-evenly"
        style={{ flex: 1 }}
      >
        <h4 className="mt-4 vazir-thin">{item.name}</h4>
        <div className="d-flex flex-row-reverse justify-content-around w-100 flex-wrap">
          <span className="p-3">{item.price} تومان</span>
          <span className="p-3">{categories?.[item.category].name}</span>
        </div>
      </div>
    </div>
  );
};

export { Card };
