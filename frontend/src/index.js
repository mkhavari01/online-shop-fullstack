// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
import App from "./App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App tab="home" />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  </Provider>
);
