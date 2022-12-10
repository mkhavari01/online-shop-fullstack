import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Offset2 = ({ changeOffset, offset }) => {
  const handleChange = (event) => {
    changeOffset(event.target.value);
  };
  return (
    <>
      {offset >= 10 ? (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <div className="d-flex align-items-center">
            <FormHelperText>Per Page</FormHelperText>
            <Select
              value={offset}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={40}>40</MenuItem>
            </Select>
          </div>
        </FormControl>
      ) : null}
    </>
  );
};

export { Offset2 };
