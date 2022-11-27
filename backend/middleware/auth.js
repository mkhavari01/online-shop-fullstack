import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.token;

  const decodedToken = jwt.verify(token, "mkhavari0120");

  req.userData = { username: decodedToken.username };

  next();
};

export { auth };
