import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import AuthContext from "../../../../context/AuthContext";
import { useContext } from "react";
import useAxios from "../../../../utils/useAxios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker/TimePicker";
// import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

const useStyles = makeStyles({
  // root: {
  //   textAlign: "center",
  // },
  boxContainer: {
    marginBottom: "3rem",
  },
  box: {
    alignment: "center",
    marginTop: "1%",
    marginBottom: "1%",
    marginLeft: "10%",
    marginRight: "25%",
    bgcolor: "rgb(245, 246, 248)",
    width: "45%",
    height: "100%",
    border: "1px solid black",
    borderRadius: "10px",
    // padding: "20px",
    paddingTop: "1.5rem",
    paddingBottom: "0.1rem",
    "& .MuiTextField-root": { m: 0 },
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
  },
  button: {
    backgroundColor: "#3b82f6",
    contrastText: "#fff",
    "&:hover": {
      backgroundColor: "#2563eb",
    },
  },
  breakLine: {
    marginBottom: "1rem",
    marginTop: "1rem",
    backgroundColor: "#000",
  },
  timePicker: {
    direction: "ltr",
    marginTop: "1rem",
  },
  table: {
    justifyContent: "center",
    marginTop: "5rem",
    marginBottom: "1rem",
    marginLeft: "50%",
    marginRight: "50%",
  },
});

function createData(day, fromTime, toTime) {
  return {
    day,
    fromTime,
    toTime,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "day", numeric: false, disablePadding: true, label: "روز" },
  { id: "fromTime", numeric: false, disablePadding: false, label: "از ساعت" },
  { id: "toTime", numeric: false, disablePadding: false, label: "تا ساعت" },
];
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
          fullwidth
        >
          زمان ها
        </Typography>
      )}

      {numSelected > 0 ? (
        {
          /* <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip> */
        }
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const weekdays = [
  { id: 1, name: "شنبه" },
  { id: 2, name: "یکشنبه" },
  { id: 3, name: "دوشنبه" },
  { id: 4, name: "سه شنبه" },
  { id: 5, name: "چهارشنبه" },
  { id: 6, name: "پنجشنبه" },
  { id: 7, name: "جمعه" },
];

const formValues = {
  id: 0,
  day: "",
  fromTime: "",
  toTime: "",
  doctorId: 0,
};

export default function AppointmentReports() {
  const classes = useStyles();
  // const [userID, setUserID] = useState(0);
  const [values, setValues] = useState({ ...formValues });
  const [errors, setErrors] = useState({ ...formValues });
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { authData } = useContext(AuthContext);
  const API = useAxios();
  const [startTime, setStartTime] = React.useState(
    dayjs("2014-08-18T21:11:54")
  );
  const [endTime, setEndTime] = React.useState(dayjs("2014-08-18T21:11:54"));
  const rows = [
    ...availableTimes.map((item) => {
      return createData(
        weekdays.find((day) => day.id - 1 === item.day),
        item.fromTime,
        item.toTime
      );
    }),
  ];

  // Table Info
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { authTokens } = useContext(AuthContext);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => {
    console.log("selected: ", selected);
    return selected.indexOf(id) !== -1;
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    console.log("in validate func: ", fieldValues);
    if ("day" in fieldValues) {
      temp.day = fieldValues.day ? "" : "روز موردنظر را وارد کنید.";
    }
    if ("fromTime" in fieldValues) {
      temp.fromTime = fieldValues.fromTime
        ? ""
        : "ساعت شروع نوبت دهی را وارد کنید.";
    }
    if ("toTime" in fieldValues) {
      temp.toTime = fieldValues.toTime
        ? ""
        : "ساعت پایان نوبت دهی را وارد کنید.";
    }
    setErrors({
      ...temp,
    });

    console.log("This is the fieldValues: ", fieldValues);
    if (fieldValues === values) {
      console.log("going out of validate func:");
      // return Object.values(temp).every((x) => x === "");
      return true;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetching the doctor id from the user id
      await API.get(`/api/doctor/user_id_to_doctor_id/${user.user_id}/`, {
        headers: {
          Authorization: `Bearer ${authData.access}`,
        },
      })
        .then(async (res) => {
          // console.log("this is res.data.id: ", res.data.id);
          setValues({
            ...values,
            doctorId: res.data.id,
          });
          // console.log("this is the values: ", values);
          API.get("http://188.121.113.74/api/doctor/workday/", {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          })
            .then(async (response) => {
              setTimeout(() => {
                try {
                  // setLoading(true);
                  console.log(
                    "this is the response of workday: ",
                    response.data
                  );
                  const temptimes = response.data.filter((item) => {
                    if (item.doctor === res.data.id) {
                      console.log(
                        "in useEffect condition setting availableTimes"
                      );
                      return {
                        id: item.id,
                        day: item.day,
                        fromTime: item.from_time,
                        toTime: item.to_time,
                        doctorId: item.doctor,
                      };
                    }
                  });
                  console.log("this is the temptimes: ", temptimes);
                  setAvailableTimes([...temptimes]);
                  console.log("this is the availableTimes: ", availableTimes);
                } catch (error) {
                  console.log("this is the error of availableTimes: ", error);
                }
              }, 1);
            })
            .catch((error) => {
              console.log("this is the error of workday", error);
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (loading) {
      // fetchData();
      // console.log("this is the availableTimes: ", availableTimes);
      // setLoading(false);
      try {
        console.log("loading: ", loading);
        fetchData();
        console.log("this is the availableTimes: ", availableTimes);
      } catch (error) {
        console.log("this is the error of availableTimes: ", error);
      } finally {
        console.log("setting the loading to false");
        setLoading(false);
        // console.log("loading: ", loading);
      }
    }
    console.log("loading after if statement: ", loading);
    setLoading(false);
    console.log("loading after setting to false: ", loading);
    console.log(
      "this is the availableTimes after if statement in useeffect: ",
      availableTimes
    );
    // console.log("this is the rows: ", row)

    const id = setInterval(() => {
      fetchData();
    }, 200000);

    return () => clearInterval(id);
  }, [loading, API, authTokens.access, user.user_id, values, availableTimes]);

  console.log("availableTimes outside of useeffect: ", availableTimes);
  console.log("rows outside of useeffect: ", rows);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("in submit func: ", values);
      axios
        .post(
          // `http://188.121.113.74/api/doctor/workday/${values.id}/`,
          `http://188.121.113.74/api/doctor/workday/`,
          {
            // ...values,
            // from_time: startTime,
            // to_time: endTime,
            // from_time: `{values.fromTime.$H}:${values.fromTime.$m}:00`,
            from_time: values.fromTime.$H + ":" + values.fromTime.$m + ":00",
            // to_time: `{values.toTime.$H}:${values.toTime.$m}:00`,
            to_time: values.toTime.$H + ":" + values.toTime.$m + ":00",
            day: values.day - 1,
            doctor: values.doctorId,
            id: values.id,
          }
          // {
          //   headers: {
          //     Authorization: `Bearer ${authTokens.access}`,
          //   },
          // }
        )
        .then((response) => {
          toast.success(`زمان موردنظر با موفقیت ثبت شد.`, {
            position: "top-right",
            autoClose: 2000,
          });
        })
        .catch((error) => {
          toast.error("مشکلی پیش آمده است", {
            position: "top-right",
            autoClose: 2000,
          });
        });
      setLoading(true);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item md={6} xs={12} className={classes.table}>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }} className={classes.table}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {console.log("this is the rows in TableBody: ", rows)}
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.name)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </Paper>
          {/* <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          /> */}
        </Box>
      </Grid>

      {/** Time Selection */}
      <Grid item xs={12}>
        <form
          onSubmit={handleSubmit}
          className={classes.box}
          autoComplete="off"
        >
          <Container className={classes.boxContainer}>
            <Grid>
              <Typography
                className={classes.formHeader}
                align="center"
                variant="h5"
                component="h5"
              >
                روز و زمان مورد نظر خود را انتخاب کنید
              </Typography>
            </Grid>

            <hr className={classes.breakLine} />

            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                // md={6}
              >
                <FormControl fullWidth>
                  <InputLabel>روز هفته</InputLabel>
                  <Select
                    fullwidth
                    label="روز هفته"
                    name="day"
                    value={values.day}
                    onChange={handleInputChange}
                    error={errors.day ? true : false}
                    helperText={errors.day ? errors.day : null}
                  >
                    {weekdays.map((weekday) => (
                      <MenuItem key={weekday.id} value={weekday.id}>
                        {weekday.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                item
                xs={12}
                // md={6}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <TimePicker
                      // className={classes.timePicker}
                      ampm={false}
                      fullWidth
                      label="از ساعت"
                      value={values.fromTime}
                      onChange={(newValue) => {
                        console.log(
                          "this is the new fromTime value: ",
                          newValue
                        );
                        setValues({ ...values, fromTime: newValue });
                        setStartTime(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      error={errors.fromTime ? true : false}
                      helperText={errors.fromTime ? errors.fromTime : null}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid
                item
                xs={12}
                // md={6}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <TimePicker
                      ampm={false}
                      label="تا ساعت"
                      value={values.toTime}
                      onChange={(newValue) => {
                        setValues({ ...values, toTime: newValue });
                        setEndTime(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      error={errors.toTime ? true : false}
                      helperText={errors.toTime ? errors.toTime : null}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>

              <Grid
                item
                xs={12}
                // md={6}
              >
                <button className={classes.button} type="submit">
                  ذخیره اطلاعات
                </button>
              </Grid>
            </Grid>
          </Container>
        </form>
      </Grid>
    </Grid>
  );
}
