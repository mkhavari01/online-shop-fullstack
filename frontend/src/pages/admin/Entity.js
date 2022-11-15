import { useSelector } from "react-redux";
import { fetchProducts } from "redux/actions/productsActions";
import { Pagination } from "components/Pagination";
import { TableGrid } from "components/TableGrid";

const Entity = (props) => {
  const state = useSelector(state => state)
  return (
    <section className="container mt-4" >
      <div className="d-flex align-items-center justify-content-end">
          {/* <Button variant="contained" className="mb-4" color="success">
            <span className=" vazir-medium" >
              افزودن کالا 
            </span>
          </Button> */}
          <h1 className="h1 vazir-bold text-end mb-5 text-primary p-2 rounded px-4">
            مدیریت موجودی و قیمت ها
          </h1>
        </div>
      <TableGrid headers={["", 'موجودی', 'قیمت', 'نام کالا']} state={state.products} bodyItems={["quantity", "price", "name", ""]} />
      <Pagination actionFunc={fetchProducts(1, 4)} pageNumbers={3} pageLimitation={3} />
    </section>
  )
}

export { Entity }