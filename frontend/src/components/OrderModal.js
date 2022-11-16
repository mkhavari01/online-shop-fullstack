import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { ordersApi } from "api/orders.api";
import { useDispatch } from "react-redux";
import { fetchOrders } from "redux/actions/ordersAction";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const OrderModal = ({ open, data, setOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  function handleClose() {
    setOpen(false);
  }

  function handleChangeDelivery() {
    ordersApi
      .patch(data?._id, { field: "deliverd", data: true })
      .then((res) => {
        dispatch(fetchOrders());
        setOpen(false);
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle
        id="responsive-dialog-title"
        className="text-center bg-primary text-white d-flex justify-content-between"
      >
        <span>جزییات سفارش</span>
        <span className="cursur-pointer" onClick={handleClose}>
          X
        </span>
      </DialogTitle>
      <DialogContent className="mt-2">
        <Stack spacing={2} alignItems={"stretch"}>
          <Item className="vazir-bold text-end">
            نام مشتری : {data.username}
          </Item>
          <Item className="vazir-bold text-end">آدرس : {data.address}</Item>
          <Item className="vazir-bold text-end">تلفن : {data.phone}</Item>
          <Item className="vazir-bold text-end">
            زمان سفارش :{" "}
            {new Date(data.time).toLocaleString("Fa-ir", {
              year: "numeric",
              day: "numeric",
              month: "long",
            })}
          </Item>
          <h5>محصولات :</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">کالا</th>
                <th scope="col">قیمت</th>
                <th scope="col">تعداد</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((el) => {
                return (
                  <tr key={el.name}>
                    <th scope="row">{el.name}</th>
                    <td>{el.price}</td>
                    <td>{el.entity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Stack>
      </DialogContent>
      <DialogActions className="text-center">
        <div autoFocus className="w-100 mb-3">
          {data?.deliverd ? (
            <span
              className="bg-success p-2 text-white rounded cursur-pointer"
              onClick={handleClose}
            >
              {new Date(data.time).toLocaleString("Fa-ir", {
                year: "numeric",
                day: "numeric",
                month: "long",
              })}
            </span>
          ) : (
            <span
              className="bg-success p-2 text-white rounded cursur-pointer"
              onClick={handleChangeDelivery}
            >
              تحویل شد
            </span>
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export { OrderModal };
