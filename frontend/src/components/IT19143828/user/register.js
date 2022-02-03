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
import "../addToken/style.css";
import setAlert, { setAlerDanger } from "../Alert/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "85%",
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
      "url(https://mir-s3-cdn-cf.behance.net/project_modules/disp/21a9ae12413727.5626f647eb58b.jpg)",
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
  eid: "",
  name: "",
  email: "",
  address: "",
  contact: "",
  password: "",
  errors: {
    eid: "",
    name: "",
    email: "",
    address: "",
    contact: "",
    password: "",
  },
};

const Register = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [data, setData] = useState();
  const [state, setState] = useState({
    eid: "",
    name: "",
    email: "",
    address: "",
    contact: "",
    password: "",
    errors: {
      eid: "",
      name: "",
      email: "",
      address: "",
      contact: "",
      password: "",
    },
  });

  //Insert data
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { eid, name, email, address, contact, password } = state;
      if (validateForm(state.errors)) {
        console.info("Valid Form");
        if (
          eid.trim() !== "" &&
          name.trim() !== "" &&
          email.trim() !== "" &&
          address.trim() !== "" &&
          contact.trim() !== "" &&
          password.trim() !== ""
        ) {
          const user = {
            eid: eid,
            name: name,
            email: email,
            address: address,
            contact: contact,
            password: password,
          };
          axios
            .post(`${API_URL}/api/user`, user, {
              //   headers: {
              //     Authorization: `Bearer ${localStorage.getItem("user")}`,
              //   },
            })
            .then((res) => {
              setState(initialState);
              setAlert("Successfully inserted");
              history.push("/signin")
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

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;
    const validEID = RegExp(/\d{6}/);
    const validContact = RegExp(/^\d{10}$/);
    const validEmail = RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const validPassword = RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
    const validName = RegExp(/[A-Za-z-]*$/);

    switch (name) {
        case "eid":
          errors.eid =
            value.length < 5
              ? "User ID must be 5 characters long! Ex:- U0000"
              : "";
          if (validEID.test(value)) {
            errors.eid = "Enter valid User ID! Ex:- LS0000";
          }
          break;
        case "name":
          errors.name =
            value.length <= 0 ? "Name Can not be empty! Ex :- Jhon will" : "";
  
          if (!validName.test(value)) {
            errors.name = "Enter valid Name! Ex:- Jhon will";
          }
          break;
          case "email":
          errors.email =
            value.length <= 0
              ? "Email can not be empty! Ex :- jhon@mail.com"
              : "";
          if (!validEmail.test(value)) {
            errors.email = "Enter valid Email ! Ex:- jhon@mail.com";
          }
          break;
        case "address":
          errors.address =
            value.length <= 0
              ? "Address can not be empty! Ex :- No: 0, Frist lane ,Colombo 5"
              : "";
  
          break;
        case "contact":
          errors.contact =
            value.length <= 0 ? "Contact can not be empty! Ex :- 0000000000" : "";
          if (!validContact.test(value)) {
            errors.contact = "Enter valid contact details ! Ex:- 0000000000";
          } else if (value.length > 10 || value.length < 10) {
            errors.contact =
              "Contact number must be 10 digit long ! Ex:- 0000000000";
          }
          break;
        case "password":
          errors.password = value.length <= 0 ? "Password can not be empty!" : "";
  
          if (!validPassword.test(value)) {
            errors.password =
              "Password must be cantain 1 Capital letter , 1 special charectar , 1 digit and 8 charectars long  ! Ex:- A@1aaaaa";
          }
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
            Sign Up Now
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="eid"
              label="Employee ID"
              name="eid"
              autoComplete="eid"
              autoFocus
              value={state.eid || ""}
              onChange={handleInputChange}
            />

            {errors.eid.length > 0 && (
              <span className="error">{errors.eid}</span>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Employee Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={state.name || ""}
              onChange={handleInputChange}
            />

            {errors.name.length > 0 && (
              <span className="error">{errors.name}</span>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E- mail address"
              name="email"
              autoComplete="email"
              autoFocus
              value={state.email || ""}
              onChange={handleInputChange}
            />

            {errors.email.length > 0 && (
              <span className="error">{errors.email}</span>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="contact"
              label="Contact Number"
              name="contact"
              autoComplete="contact"
              autoFocus
              value={state.contact || ""}
              onChange={handleInputChange}
            />

            {errors.contact.length > 0 && (
              <span className="error">{errors.contact}</span>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              multiline
              autoFocus
              value={state.address || ""}
              onChange={handleInputChange}
            />
            {errors.address.length > 0 && (
              <span className="error">{errors.address}</span>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
              value={state.password || ""}
              onChange={handleInputChange}
            />

            {errors.password.length > 0 && (
              <span className="error">{errors.password}</span>
            )}

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

export default Register;
