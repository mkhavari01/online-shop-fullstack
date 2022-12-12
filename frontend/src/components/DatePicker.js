import AdapterJalaali from "@date-io/jalaali";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "moment-jalaali";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useState } from "react";

const DatePricker = ({ setDeliverTime }) => {
  const [value, setValue] = useState(dayjs(new Date()));

  const handleChange = (newValue) => {
    setValue(newValue);
    setDeliverTime(new Date(newValue._d).getTime());
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterJalaali}>
        <Stack spacing={3}>
          <MobileDatePicker
            label=" "
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </>
  );
};
export { DatePricker };
