import { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { toPersianNumber } from "utils/toPersianNmber";

const min = 0;
const InputOrText = ({ valueProp, id, field, datas, flag, setDatas }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(valueProp);
  let inputEl = useRef(null);

  useEffect(() => {
    setEdit(false);
  }, [flag]);

  function modeHandler() {
    setEdit(true);
    let local = JSON.parse(localStorage.getItem("sent"));
    if (!local) localStorage.setItem("sent", JSON.stringify([]));
    local = JSON.parse(localStorage.getItem("sent"));
    localStorage.setItem(
      "sent",
      JSON.stringify([...local, { id, ref: inputEl, field }])
    );
  }

  function changeInput(e) {
    let value = parseInt(e.target.value, 10);
    if (value < min) value = min;
    setValue(value);
    let local = JSON.parse(localStorage.getItem("sent")) || [];
    local.forEach((el) => {
      if (el.id === id && field === el.field) {
        el.ref = inputEl.current.getElementsByTagName("input")[0].value;
      }
    });
    localStorage.setItem("sent", JSON.stringify(local));
  }

  return (
    <>
      {edit ? (
        <TextField
          id="outlined-number"
          label=" لطفا به عدد وارد شود"
          type="number"
          InputLabelProps={{
            shrink: true,
            max: 100,
            min: 10,
          }}
          value={value}
          onChange={changeInput}
          ref={inputEl}
        />
      ) : (
        <span onClick={() => modeHandler()}>{toPersianNumber(value)}</span>
      )}
    </>
  );
};

export { InputOrText };
