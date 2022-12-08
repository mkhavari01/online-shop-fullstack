const Card = ({ post }) => {
  return (
    <div className="card">
      <p className="card__title">{post.name}</p>
      <p className="card__author">{post.price}</p>
      <p className="card__body">{post.description}</p>
    </div>
  );
};

export default Card;
