import React, { useState , useEffect} from "react";
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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import img1 from '../images/remai.jpg'
import img2 from '../images/slss.jpg'
import img3 from '../images/paa.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
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
  media: {
    height: 150,

  },
  image: {
    backgroundImage:
      "url(https://www.wallpapertip.com/wmimgs/13-135942_mercedes-tourismo.jpg)",
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
  CardContent:{
    textAlign: "center"
  },
  card:{
    width: "60%",
    margin: "auto",
    marginTop: "20px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const initialState = {
  amount: "",
  status: "",
  errors: {
    amount: "",
    status: "",
  },
};

const Dashboad = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const { useState } = React;
  const [data, setData] = useState();
  const [count, setCount] = useState();
  const [sum, setSum] = useState();

  const [state, setState] = useState({
    amount: "",
    status: "",
    errors: {
      amount: "",
      status: "",
    },
  });
 const Lizard ="200";

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

useEffect(() => {
  const getFileList = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/tokenpaidcount`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,
        // },
      });
      setCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  getFileList();
}, );

useEffect(() => {
  const getFileList = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/tokenpaidsum`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,
        // },
      });
      setSum(data);
    } catch (error) {
      console.log(error);
    }
  };

  getFileList();
  console.log(sum);
}, );

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <br />
          <Typography component="h1" variant="h5">
            Dashboard
          </Typography>
          <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img1}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.CardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {data}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Remaining Credits
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img2}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.CardContent}>
          <Typography gutterBottom variant="h5" component="h2">
          {count}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Total Tours
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img3}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.CardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {sum}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Total Paid Amount
          </Typography>
        </CardContent>
      </CardActionArea>
 
    </Card>
        </div>
      </Grid>
    </Grid>
  );
};

export default Dashboad;
