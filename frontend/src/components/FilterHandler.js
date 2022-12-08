import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
const FilterOrder = ({ setStatus, status }) => {
  function filterHandler(e) {
    setStatus(e.target.value);
  }

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={status}
        onChange={filterHandler}
      >
        <FormControlLabel
          value={"false"}
          control={<Radio />}
          label="سفارش های در انتظار ارسال"
        />
        <FormControlLabel
          value={"true"}
          control={<Radio />}
          label="سفارش های تحویل شده"
        />
      </RadioGroup>
    </FormControl>
  );
};

export { FilterOrder };
