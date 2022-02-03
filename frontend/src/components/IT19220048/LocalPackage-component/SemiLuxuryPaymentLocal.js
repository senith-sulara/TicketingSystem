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
import setAlert, { setAlerDanger } from "../../IT19204062/Alert/Alert";

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
    backgroundImage: "url(https://wallpapercave.com/wp/wp2120665.jpg)",
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
  name: "",
  amount: "",
  expireDate: "",
  fromTo: "",
  whereTo: "",
  errors: {
    name: "",
    amount: "",
    expireDate: "",
    fromTo: "",
    whereTo: "",
  },
};

const LuxuryPaymentLocal = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [state, setState] = useState({
    name: "",
    amount: "",
    expireDate: "",
    fromTo: "",
    whereTo: "",

    errors: {
      name: "",
      amount: "",
      expireDate: "",
      fromTo: "",
      whereTo: "",
    },
  });

  //Insert data
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { name, amount, expireDate, fromTo, whereTo } = state;
      if (validateForm(state.errors)) {
        console.info("Valid Form");
        if (
          name.trim() !== "" &&
          amount.trim() !== "" &&
          expireDate.trim() !== "" &&
          fromTo.trim() !== "" &&
          whereTo.trim() !== ""
        ) {
          const history = {
            name: name,
            amount: amount,
            expireDate: expireDate,
            fromTo: fromTo,
            whereTo: whereTo,
          };
          axios
            .post(`${API_URL}/api/payment`, history, {})
            .then((res) => {
              setState(initialState);
              setAlert(
                "LKR. 1000.00 selected package. Token has been successfully purchased"
              );
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
      case "name":
        errors.name =
          value.length < 4 ? " Name must be 4 characters long!" : "";
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
          <Typography component="h1" variant="h4">
            <b>Make a Payment</b>
            <br />
          </Typography>
          <br />

          <Typography component="h6" variant="h6">
            &nbsp;&nbsp; LKR. 1000.00
            <br />
            selected package
          </Typography>

          <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={state.name || ""}
              onChange={handleChange}
            />
            {errors.name.length > 0 && (
              <span className="error">{errors.name}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="amount"
              label="Amount"
              name="amount"
              autoComplete="amount"
              autoFocus
              value={state.amount || ""}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="expireDate"
              label=" Date"
              name="expireDate"
              autoComplete="expireDate"
              autoFocus
              value={state.expireDate || ""}
              onChange={handleChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="fromTo"
              label="Depature"
              name="fromTo"
              autoComplete="fromTo"
              autoFocus
              value={state.fromTo || ""}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="whereTo"
              label="Destination"
              name="whereTo"
              autoComplete="whereTo"
              autoFocus
              value={state.whereTo || ""}
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
                Pay Now
              </Button>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default LuxuryPaymentLocal;
