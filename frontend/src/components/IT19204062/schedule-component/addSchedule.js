import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { useHistory } from "react-router-dom";
import "./style.css";
import setAlert, { setAlerDanger } from "../Alert/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "60%",
    margin: "auto",
    marginTop: "20px",
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  image: {
    backgroundImage:
      "url(https://www.sustainable-bus.com/wp-content/uploads/2019/12/Schermata-2019-12-06-alle-09.59.28.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btnGroup: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: "90%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const initialState = {
  busNumber: "",
  driver: "",
  depature: "",
  destination: "",
  time: "",
  errors: {
    busNumber: "",
    driver: "",
    depature: "",
    destination: "",
    time: "",
  },
};

const AddSchedule = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [state, setState] = useState({
    busNumber: "",
    driver: "",
    depature: "",
    destination: "",
    time: "",
    errors: {
      busNumber: "",
      driver: "",
      depature: "",
      destination: "",
      time: "",
    },
  });

  //Insert data
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { busNumber, driver, depature, destination, time } = state;
      if (validateForm(state.errors)) {
        console.info("Valid Form");
        if (
          busNumber.trim() !== "" &&
          driver.trim() !== "" &&
          depature.trim() !== "" &&
          destination.trim() !== "" &&
          time.trim() !== ""
        ) {
          const schedule = {
            busNumber: busNumber,
            driver: driver,
            depature: depature,
            destination: destination,
            time: time,
          };
          axios
            .post(`${API_URL}/api/schedule/add`, schedule, {
              //   headers: {
              //     Authorization: `Bearer ${localStorage.getItem("token")}`,
              //   },
            })
            .then((res) => {
              setState(initialState);
              setAlert("Successfully inserted");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setAlerDanger("Please enter all the field values.");
        }
      } else {
        setAlerDanger("Please enter valid field values.");
      }
    } catch (error) {
      error.response && setAlerDanger(error.response.data);
    }
  };

  //validations
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;

    switch (name) {
      case "busNumber":
        errors.busNumber =
          value.length > 6 ? "Bus Number must be less than 6 characters!" : "";
        break;
      default:
        break;
    }
    setState({
      ...state,
      [event.target.name]: event.target.value,
      errors,
      [name]: value,
    });
  };

  const { errors } = state;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <br />
          <Typography component="h1" variant="h5">
            Add New Bus Schedule
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="busNumber"
              label="Bus Number"
              name="busNumber"
              autoComplete="busNumber"
              autoFocus
              value={state.busNumber || ""}
              onChange={handleChange}
            />
            {errors.busNumber.length > 0 && (
              <span className="error">{errors.busNumber}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="driver"
              label="Driver"
              name="driver"
              autoComplete="driver"
              autoFocus
              value={state.driver || ""}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="depature"
              label="Depature"
              name="depature"
              autoComplete="depature"
              autoFocus
              value={state.depature || ""}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="destination"
              label="Destination"
              name="destination"
              autoComplete="destination"
              autoFocus
              value={state.destination || ""}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="time"
              label="Time"
              name="time"
              autoComplete="time"
              autoFocus
              value={state.time || ""}
              onChange={handleChange}
            />

            <div className={classes.btnGroup}>
              <Button
                id="btnBack"
                type="button"
                onClick={history.goBack}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.back}
              >
                Back
              </Button>

              <Button
                id="btnSave"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.sub}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default AddSchedule;
