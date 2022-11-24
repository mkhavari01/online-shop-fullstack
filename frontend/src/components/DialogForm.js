import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import AutoComplete from "components/AutoComplete";
import InputPhoto from "./InputPhoto";
import { useDispatch, useSelector } from "react-redux";
import { patchProduct, postProduct } from "redux/actions/productsActions";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const DialogForm = ({
  btnName,
  headerTitle,
  mode,
  openProduct,
  setOpenProduct,
  dataEdit,
}) => {
  const [open, setOpen] = React.useState(openProduct || false);
  const [scroll, setScroll] = React.useState("paper");
  const [nameProduct, setNameProduct] = React.useState("");
  const [nameCategory, setNameCategory] = React.useState("");
  const [nameSubCategory, setSubNameCategory] = React.useState("");
  const [descriptionProduct, setDescriptionProduct] = React.useState("");
  const [inputFile, setInputFile] = React.useState({});
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setNameProduct("");
    setNameCategory("");
    setDescriptionProduct("");
    setInputFile({});
    setOpen(false);
    if (mode === "edit") {
      setOpenProduct(false);
    }
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    if (openProduct) {
      setNameProduct(dataEdit.name);
      setNameCategory(data.categories[dataEdit.category]);
      setDescriptionProduct(dataEdit.description);
      setOpen(true);
    }
  }, [openProduct, dataEdit]);

  const handleAutoCompleteValue = (data) => {
    // console.log("data in ghe", data);
    setNameCategory(data);
  };

  const handleAutoCompleteValue2 = (data) => {
    setSubNameCategory(data);
  };

  const handleInputPhotoValue = (data) => {
    setInputFile(data);
  };

  const handleDescriptionValue = (data) => {
    setDescriptionProduct(data.target.value);
  };

  const handleSave = () => {
    let formdata = new FormData();
    formdata.append("productImage", inputFile);
    formdata.append("name", nameProduct);
    formdata.append("description", descriptionProduct);
    formdata.append("category", nameCategory.id);
    dispatch(postProduct(formdata));
    handleClose();
  };

  const handleUpdate = () => {
    let formdata = new FormData();
    formdata.append("productImage", inputFile);
    formdata.append("name", nameProduct);
    formdata.append("category", nameCategory.id - 1);
    formdata.append("description", descriptionProduct);
    dispatch(patchProduct(dataEdit._id, formdata));
    handleClose();
  };

  return (
    <>
      {mode === "edit" ? null : (
        <Button
          className="text-white vazir-medium mb-4"
          variant="contained"
          color="success"
          onClick={handleClickOpen("paper")}
        >
          {btnName}
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" className="text-end vazir-medium">
          {headerTitle}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <InputPhoto
            passData={handleInputPhotoValue}
            src={
              process.env.REACT_APP_BACKEND_URL + "/" + dataEdit?.productImage
            }
          />
          <TextField
            id="name-product"
            hiddenLabel={true}
            variant="filled"
            placeholder="نام کالا"
            fullWidth
            className="mt-3"
            value={nameProduct || ""}
            onChange={(e) => setNameProduct(e.target.value)}
          />
          <AutoComplete
            nameCategory={nameCategory}
            passData={handleAutoCompleteValue}
            arrayData={data.categories || []}
            subData={"name"}
            placeholder="سرگروه"
          />
          {/* {nameCategory ? (
              <AutoComplete
                subGroup={true}
                passData={handleAutoCompleteValue2}
                arrayData={nameCategory.subGroups}
                subData={"title"}
                placeholder="زیر گروه"
              />
            ) : (
              ""
            )} */}
          <TextareaAutosize
            value={descriptionProduct}
            aria-label="empty textarea"
            placeholder="توضیحات کالا"
            onChange={handleDescriptionValue}
            style={{
              width: "100%",
              textAlign: "right",
              marginTop: "30px",
              height: "200px",
              fontSize: "14px",
              fontFamily: "vazir-medium",
              direction: "rtl",
              border: "none",
              borderBottom: "solid 0.5px gray",
              background: "#f0f0f0",
              borderTopRightRadius: "5px",
              borderTopLeftRadius: "5px",
              padding: "7px",
            }}
          />
        </DialogContent>
        <DialogActions className="justify-content-start mx-3">
          <Button
            className="vazir-medium"
            variant="contained"
            color="success"
            onClick={mode === "edit" ? handleUpdate : handleSave}
          >
            ذخیره
          </Button>
          <Button
            className="vazir-light"
            variant="outlined"
            color="error"
            onClick={handleClose}
          >
            انصراف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { DialogForm };
