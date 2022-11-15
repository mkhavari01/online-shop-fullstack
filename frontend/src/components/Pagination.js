import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/actions/productsActions";

const Pagination = (props) => {

  const dispatch = useDispatch()
  const [pages, setPages] = useState(props.pageNumbers);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimitation, setPageLimitation] = useState(props.pageLimitation);

  useEffect(() => {
    dispatch(props.actionFunc)
  }, []);

  function paginationHandler(pageNumber) {
    dispatch(fetchProducts(pageNumber, pageLimitation));
    setCurrentPage(pageNumber)
  }

  function previousPageHandler() {
    dispatch(fetchProducts(currentPage - 1, pageLimitation))
    setCurrentPage(currentPage - 1)
  }

  function nextPageHandler() {
    dispatch(fetchProducts(currentPage + 1, pageLimitation))
    setCurrentPage(currentPage + 1)
  }

  return (
    <nav aria-label="Page navigation example">
          <ul className="justify-content-center m-0 pagination vazir-light">
            <li className={`page-item ${currentPage > 1 ? "" : "disabled "}`}>
              {currentPage > 1 ? <span className="page-link cursur-pointer" onClick={previousPageHandler} >قبل</span> :
                <span className="page-link cursur-defualt ">قبل</span>
              }
            </li>
            {new Array(pages).fill(0).map(function (el, index) {
              return (
                <li key={index} className="cursur-pointer page-item" onClick={() => paginationHandler(index + 1)} >
                  <span className={`page-link ${currentPage == index+1 ? "bg-primary text-white" : ""}`} >{index + 1}</span>
                </li>
              )
            })}
            <li className={`page-item ${currentPage == pages ? "disabled" : ""}`}>
              {currentPage == pages ? <span className="page-link cursur-defualt" >بعد</span> :
                <span className="page-link cursur-pointer " onClick={nextPageHandler} >بعد</span>
              }
            </li>
          </ul>
        </nav>
  )
}

export { Pagination }