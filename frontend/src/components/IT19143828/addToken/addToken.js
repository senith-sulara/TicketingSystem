import React, { useState, useEffect } from "react";
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
      "url(http://www.idesigniphone.net/wallpapers/53775.jpg)",
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
  bot: {
    textAlign: "center"

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const initialState = {
  amount: "",
  cardNumber: "",
  cvv: "",
  expireDate: "",
  status: "",
  errors: {
    amount: "",
    cardNumber: "",
    cvv: "",
    expireDate: "",
    status: "",
  },
};

const RechargeToken = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [data, setData] = useState();
  const [state, setState] = useState({
    amount: "",
    cardNumber: "",
    cvv: "",
    expireDate: "",
    status: "",
    errors: {
      amount: "",
      cardNumber: "",
      cvv: "",
      expireDate: "",
      status: "",
    },
  });

  //Insert data
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { amount, cardNumber, cvv, expireDate, status } = state;
      if (validateForm(state.errors)) {
        console.info("Valid Form");
        if (
          amount.trim() !== "" &&
          cardNumber.trim() !== "" &&
          cvv.trim() !== "" &&
          expireDate.trim() !== "" &&
          status.trim() !== ""
        ) {
          const token = {
            amount: amount,
            cardNumber: cardNumber,
            cvv: cvv,
            expireDate: expireDate,
            status: status,
          };
          axios
            .post(`${API_URL}/api/token`, token, {
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
      case "amount":
        errors.amount =
          value <= 99  ? "Amount must be more than 99.00 LKR" : "";
        break;
        case "cardNumber":
        errors.cardNumber =
          value.length < 16  ? "Card Number must be 16 digit" : "";
        break;
        case "cvv":
        errors.cvv =
          value.length < 3  ? "CVV must be 3 digit" : "";
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

  
 useEffect(() => {
  const getFileList = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/tokensum`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,
        // },
      });
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  getFileList();
}, );

  const { errors } = state;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <br />
          <Typography component="h1" variant="h5">
            Recharge Token
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount"
              name="amount"
              autoComplete="amount"
              autoFocus
              value={state.amount || ""}
              onChange={handleChange}
            />
            {errors.amount.length > 0 && (
              <span className="error">{errors.amount}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              id="cardNumber"
              label="Card Number"
              name="cardNumber"
              autoComplete="cardNumber"
              autoFocus
              value={state.cardNumber || ""}
              onChange={handleChange}
            />
            {errors.cardNumber.length > 0 && (
              <span className="error">{errors.cardNumber}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cvv"
              label="CVV"
              name="cvv"
              autoComplete="cvv"
              autoFocus
              value={state.cvv || ""}
              onChange={handleChange}
            />
            {errors.cvv.length > 0 && (
              <span className="error">{errors.cvv}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="expireDate"
              label="Expre Date"
              name="expireDate"
              autoComplete="expireDate"
              autoFocus
              value={state.expireDate || ""}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
            //   disabled
              margin="normal"
              required
              fullWidth
              id="status"
              label="Status"
              name="status"
              autoComplete="status"
              autoFocus
              value={state.status = "recharge"}
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
                Recharge
              </Button>
            </div>
          </form>
        </div>
        <Typography component="h1" variant="h5" className={classes.bot}>
        Remaining Credits: {data}
          </Typography>
      </Grid>
    </Grid>
  );
};

export default RechargeToken;
