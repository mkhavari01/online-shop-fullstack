import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Offset = ({ passOffsetState, currentOffset }) => {
  const [offset, setOffset] = useState(currentOffset);

  const handleChange = (event) => {
    setOffset(event.target.value);
    passOffsetState(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">تعداد</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={offset}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={30}>10</MenuItem>
      </Select>
    </FormControl>
  );
};

export { Offset };
