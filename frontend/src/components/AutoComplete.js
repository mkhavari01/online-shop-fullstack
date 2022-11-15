import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "redux/actions/categoryAction";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function AutoComplete(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const dispatch = useDispatch();

  function handleChange(e) {
    props.subGroup
      ? props.passData(
          props.arrayData.find((item) => item.title === e.target.textContent)
        )
      : props.passData(
          props.arrayData.find((item) => item.name === e.target.textContent)
        );
  }

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1000); // For demo purposes.

      if (active) {
        console.log(props.arrayData, "propsArrayData");
        setOptions([...props.arrayData]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      onChange={(e) => handleChange(e)}
      className="mt-3"
      id="asynchronous-demo"
      // sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) =>
        option[props.subData] === value[props.subData]
      }
      getOptionLabel={(option) => option[props.subData]}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel={true}
          fullWidth
          variant="filled"
          placeholder={props.placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
