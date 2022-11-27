import { body } from "express-validator";

function postProductValidate() {
  return body("name").isLength({ min: 5 });
}

export { postProductValidate };
