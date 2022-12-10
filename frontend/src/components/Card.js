import "../assets/css/card.css";

const Card = ({ item }) => {
  return (
    <div className="card dir d-flex justify-content-center align-items-center flex-column m-4 p-4">
      <img
        width={200}
        src={process.env.REACT_APP_BACKEND_URL + "/" + item.productImage}
      />
      {/* <Avatar
        alt="N/A"
        src={`${process.env.REACT_APP_BACKEND_URL + "/" + item.productImage}`}
        // sx={{ width: 56, height: 56 }}
      /> */}
      <h3 className="mt-4">{item.name}</h3>
      <p>{item.description}</p>
      <div className="d-flex flex-row-reverse justify-content-around w-100 flex-wrap">
        <span className="p-3">{item.price} تومان</span>
        <span className="p-3">{item.grouping}</span>
      </div>
    </div>
  );
};

export { Card };
