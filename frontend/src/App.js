import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Admin, Orders, Entity, Products, Category } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="admin" element={<Admin />}>
          <Route path="orders" element={<Orders />} />
          <Route path="entity" element={<Entity />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="*" element={<h1>No page is in this link</h1>} />
      </Routes>
    </>
  );
}

export default App;
