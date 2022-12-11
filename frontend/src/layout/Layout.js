import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Layout = (props) => {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid justify-content-end">
          <div className="navbar-brand d-flex align-items-center w-100 justify-content-between">
            {props.admin ? (
              <>
                <Link to="/" className="text-decoration-none">
                  <Button variant="text">
                    <span className="vazir-medium">بازگشت به سایت</span>
                  </Button>
                </Link>
                <div className="d-flex align-items-center justify-content-center">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination m-0">
                      <li className="page-item">
                        <Link
                          className="page-link vazir-light fs-6"
                          to="orders"
                        >
                          سفارش ها
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          className="page-link vazir-light fs-6"
                          to="entity"
                        >
                          موجودی و قیمت ها
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          className="page-link vazir-light fs-6"
                          to="products"
                        >
                          کالاها
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                <Link to="/cart">
                  <Button variant="contained" color="primary">
                    <span className="vazir-medium">سبد خرید</span>
                    <AddShoppingCartIcon />
                  </Button>
                </Link>

                <Link to="/admin/orders" className="text-decoration-none">
                  <Button variant="text">
                    <span className="vazir-medium">مدیریت</span>
                  </Button>
                </Link>
              </div>
            )}
            <Link to="/" className="text-decoration-none text-dark">
              <div className="d-flex align-items-center justify-content-center">
                <span className="mx-2 vazir-bold">
                  {props.admin ? "پنل مدیریت فروشگاه" : "فروشگاه فلان"}
                </span>
                <img
                  src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg"
                  alt=""
                  width="30"
                  height="24"
                  className="d-inline-block align-text-top"
                />
              </div>
            </Link>
          </div>
        </div>
      </nav>
      {props.children}
    </>
  );
};

export { Layout };
