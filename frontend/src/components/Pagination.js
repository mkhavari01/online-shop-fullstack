import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/actions/productsActions";

const Pagination = ({ pageLimitation, actionFunc, pageNumbers }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  function paginationHandler(pageNumber) {
    dispatch(actionFunc(pageNumber, pageLimitation));
    setCurrentPage(pageNumber);
  }

  function previousPageHandler() {
    dispatch(actionFunc(currentPage - 1, pageLimitation));
    setCurrentPage(currentPage - 1);
  }

  function nextPageHandler() {
    dispatch(actionFunc(currentPage + 1, pageLimitation));
    setCurrentPage(currentPage + 1);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="justify-content-center m-0 pagination vazir-light">
        <li className={`page-item ${currentPage > 0 ? "" : "disabled "}`}>
          {currentPage > 0 ? (
            <span
              className="page-link cursur-pointer"
              onClick={previousPageHandler}
            >
              قبل
            </span>
          ) : (
            <span className="page-link cursur-defualt ">قبل</span>
          )}
        </li>
        {new Array(pageNumbers).fill(0).map(function (el, index) {
          return (
            <li
              key={index}
              className="cursur-pointer page-item"
              onClick={() => paginationHandler(index)}
            >
              <span
                className={`page-link ${
                  currentPage == index ? "bg-primary text-white" : ""
                }`}
              >
                {index + 1}
              </span>
            </li>
          );
        })}
        <li
          className={`page-item ${
            currentPage == pageNumbers - 1 ? "disabled" : ""
          }`}
        >
          {currentPage == pageNumbers - 1 ? (
            <span className="page-link cursur-defualt">بعد</span>
          ) : (
            <span
              className="page-link cursur-pointer "
              onClick={nextPageHandler}
            >
              بعد
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export { Pagination };
