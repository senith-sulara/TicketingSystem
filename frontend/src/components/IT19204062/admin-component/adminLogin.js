import { useHistory } from "react-router-dom";
import InputField from "./password";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import DirectionsBus from "@material-ui/icons/DirectionsBus";
import React, { useState } from "react";
import loginStyle from "./loginStyle";
import "./backStyle.css";
import axios from "axios";
import { API_URL } from "../../utils/constants";

/**
 * inisial form input state
 * @type {{ eid: string, password: string}}
 */
const initialState = { eid: "", password: "" };

/**
 * sign in and sign up component
 * @returns {*}
 * @constructor
 */
const AdminSignIn = () => {
  /**
   * import variable
   * @type {*}
   */
  const classes = loginStyle();
  let history = useHistory();

  /**
   * states
   */
  const [showPassword, setShowpassword] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(initialState);

  /**
   * password visibility togle
   */
  const handleShowPass = () => setShowpassword((prevShowPass) => !prevShowPass);

  /**
   * form submit
   * @param e
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios
        .post(`${API_URL}/api/adminLogin/adminLog`, formData)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          if (res.data.admin) {
            localStorage.setItem("userType", "admin");
          }
        });
      try {
        const { data } = await axios.get(
          `${API_URL}/api/adminLogin/adminlog/${formData.username}`
        );
        setData(data);
        console.log(data.name);
        localStorage.setItem("user", JSON.stringify(formData));
        setData(null);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      history.push("/viewSchedule");
      console.log(formData);
      window.location.reload();
    } catch (error) {
      // error.response && setErrorMsg(error.response.data);
      console.log(error);
    }
  };

  /**
   * on text field value change
   * @param e
   */
  const onchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    switch (name) {
      case "username":
        errors.username =
          value.length <= 0 ? "User ID Can not be empty! Ex:- U0000" : "";
        break;
      case "password":
        errors.password = value.length <= 0 ? "Password can not be empty!" : "";

        break;
      default:
        break;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" className="container" maxWidth="md">
      <Paper className={classes.paper} maxWidth="mdx" elevation={3}>
        <div>
          <Avatar className={classes.avatar}>
            <DirectionsBus />
          </Avatar>
          <Typography variant="h5">Sign In</Typography>
        </div>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <InputField
              name="username"
              label="Username"
              handleOnchange={onchange}
              type="text"
            />
            {errors.eid.length > 0 && (
              <span className="error">{errors.eid}</span>
            )}

            <InputField
              name="password"
              label="Password"
              handleOnchange={onchange}
              type={showPassword ? "text" : "password"}
              handleShowPass={handleShowPass}
            />
            {errors.eid.length > 0 && (
              <span className="error">{errors.password}</span>
            )}
          </Grid>

          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <hr />
        </form>
      </Paper>
    </Container>
  );
};

export default AdminSignIn;
