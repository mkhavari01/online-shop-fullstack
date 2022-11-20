import { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";

const min = 0;
const InputOrText = ({ valueProp, id, field, setDatas, datas, flag }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(valueProp);
  const inputEl = useRef(null);

  useEffect(() => {
    setEdit(false);
  }, [flag]);

  function modeHandler() {
    setEdit(!edit);
    setDatas([...datas, { id, ref: inputEl, field }]);
  }

  function changeInput(e) {
    let value = parseInt(e.target.value, 10);
    if (value < min) value = min;
    setValue(value);
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
        <span onClick={modeHandler}>{value}</span>
      )}
    </>
  );
};

export { InputOrText };
