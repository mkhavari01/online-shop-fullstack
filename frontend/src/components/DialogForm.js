import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import AutoComplete from "components/AutoComplete";
import EditorTxt from "./EditorTxt";
import InputPhoto from "./InputPhoto";
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "redux/actions/productsActions";

import axios from "axios";

const Input = styled("input")({
  display: "none",
  textAlign: "right",
});

const DialogForm = ({ btnName, headerTitle }) => {
  const [open, setOpen] = React.useState(false);
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
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleAutoCompleteValue = (data) => {
    setNameCategory(data);
  };

  const handleAutoCompleteValue2 = (data) => {
    setSubNameCategory(data);
  };

  const handleInputPhotoValue = (data) => {
    setInputFile(data);
  };

  const handleDescriptionValue = (data) => {
    setDescriptionProduct(data);
  };

  const handleSave = () => {
    let data2 = {
      name: nameProduct,
      headgroup: nameCategory.name,
      group: nameSubCategory.title,
      description: descriptionProduct,
      image: inputFile,
      price: "0",
      quantity: 0,
    };
    let formdata = new FormData();
    Object.keys(data2).forEach((el) => {
      if (el == "image") {
        formdata.append(el, data2[el], "[PROXY]");
      } else {
        formdata.append(el, data2[el]);
      }
    });
    let requestOptions = {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
      },
      data: formdata,
    };
    dispatch(postProduct(requestOptions));
    handleClose();
  };

  return (
    <div>
      <Button
        className="text-white vazir-medium mb-4"
        variant="contained"
        color="success"
        onClick={handleClickOpen("paper")}
      >
        {btnName}
      </Button>
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
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <InputPhoto passData={handleInputPhotoValue} />
            <TextField
              id="name-product"
              hiddenLabel={true}
              variant="filled"
              placeholder="نام کالا"
              fullWidth
              className="mt-3"
              value={nameProduct}
              onChange={(e) => setNameProduct(e.target.value)}
            />
            <AutoComplete
              passData={handleAutoCompleteValue}
              arrayData={data.categories}
              subData={"name"}
              placeholder="سرگروه"
            />
            {nameCategory ? (
              <AutoComplete
                subGroup={true}
                passData={handleAutoCompleteValue2}
                arrayData={nameCategory.subGroups}
                subData={"title"}
                placeholder="زیر گروه"
              />
            ) : (
              ""
            )}
            <EditorTxt passData={handleDescriptionValue} />
          </DialogContentText>
        </DialogContent>
        <DialogActions className="justify-content-start mx-3">
          <Button
            className="vazir-medium"
            variant="contained"
            color="success"
            onClick={handleSave}
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
    </div>
  );
};

export { DialogForm };
