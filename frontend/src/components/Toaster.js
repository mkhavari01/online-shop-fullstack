const { useEffect } = require("react");
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster = () => {
  useEffect(() => {
    toast("🦄 Wow so easy!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export { Toaster };
