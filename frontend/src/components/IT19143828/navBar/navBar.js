import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DirectionsBus from "@material-ui/icons/DirectionsBus";
import SettingsPower from "@material-ui/icons/SettingsPower";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import GroupIcon from "@material-ui/icons/Group";
import AirportShuttle from "@material-ui/icons/AirportShuttle";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AccountBalance from "@material-ui/icons/AccountBalance";
import DescriptionIcon from "@material-ui/icons/Description";
import HouseIcon from "@material-ui/icons/House";
import Dashboard from "@material-ui/icons/Dashboard";
import CalendarToday from "@material-ui/icons/CalendarToday";
import { Row, Container, Col } from "react-bootstrap";
import {} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { Drawer, List } from "@material-ui/core";
import img2 from '../images/micro.png'

import Button from '@material-ui/core/Button';
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#000D3C",
    color:"#FFFFFF",
    fontSize:34
  },
  drawerHeader: {
    // display: "grid",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    // backgroundColor: "#2B3D3C",
    height:250,
    color: "#FFFFFF",
    backgroundImage: "url(https://s3.amazonaws.com/ultrawidewallpapers/86.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  NavColor: {
    backgroundColor: "#88C5E8",
  },
  ico:{
    color: "#FFFFFF"
  },
  logo:{
    marginTop:10,
    marginLeft:90
  },
  smart:{
    marginLeft:75
  },
}));

export default function NavBar() {
  let history = useHistory();
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  let [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const openMenu = Boolean(anchorEl);

  // };

  useEffect(() => {
    const getUserData = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    getUserData();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const logOut = () => {
    localStorage.clear();
    user = null;
    history.push("/logindash");
    window.location.reload();
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    console.log(user.eid);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.NavColor}>
      {/* {user = null ? (
        <> */}

{!user && (
  <>
      <Toolbar>
      {/* {user = null ? (
        <> */}
       
      {/* <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
            <MenuIcon />
          </IconButton>
          <IconButton
                color="inherit"
                aria-label="Back"
                onClick={history.goBack}
                edge="start"
              >
                <ChevronLeftIcon />
              </IconButton> */}
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                href="/"
              >
                <DirectionsBus />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Smart Travel
              </Typography>
               {/* {user = null ? (
            <> */}

            {/* {!user && (
              <> */}
              <div>
                
                  {/* <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {!user.formData.proPic ? (
                      <AccountCircle />
                    ) : (
                      <img
                        src={user.formData.proPic}
                        className="rounded-circle"
                        width="40px"
                        height="40px"
                      ></img>
                    )}
                    &nbsp;
                    <Typography>{user.formData.name}</Typography>
                  </IconButton> */}
                  <Menu
                    style={{ marginTop: "50px", width: "500px" }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    open={openMenu}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/profile"
                    >
                      <AccountCircle /> &nbsp; Profile
                    </MenuItem>
                    <hr></hr>
                    <MenuItem className="text-danger" onClick={logOut}>
                      <SettingsPower /> &nbsp; Log Out
                    </MenuItem>
                  </Menu>
                  </div>
                  <Button color="inherit" href="/">Home</Button>
                  <Button color="inherit" href="/purchaseTicket">Foreigners Corner</Button>
                  <Button color="inherit" href="#">About</Button>
                  <Button color="inherit" href="/logindash">Login</Button>
                 {/* </>
                  )} */}
                  {/* </> */}
          {/* ) : (
                    <> */}
                    {/* <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Back"
                onClick={history.goBack}
                edge="start"
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                href="/home"
              >
                <DirectionsBus />
              </IconButton>

              <Typography variant="h6" className={classes.title}>
                Smart Travel
              </Typography> */}
              {/* {user && (
              <> */}
              {/* {auth && (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  > */}
                    {/* {!user.formData.proPic ? ( */}
                      {/* <AccountCircle /> */}
                    {/* // ) : (  */}
                      {/* <img
                        // src={user.formData.proPic}
                        className="rounded-circle"
                        width="40px"
                        height="40px"
                      ></img> */}
                  {/* //  )}
                  // &nbsp;
                    //  <Typography>{user.formData.name}</Typography> */}
                  {/* </IconButton>
                  <Menu
                    style={{ marginTop: "50px", width: "500px" }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    open={openMenu}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/profile"
                    >
                      <AccountCircle /> &nbsp; Profile
                    </MenuItem>
                    <hr></hr>
                    <MenuItem className="text-danger" onClick={logOut}>
                      <SettingsPower /> &nbsp; Log Out
                    </MenuItem>
                  </Menu> */}
                {/* </div> */}
                
              {/* )} */}
              {/* </>
                )} */}
              {/* </> */}
          {/* )}               */}
        </Toolbar>
        </>
)}

 {user && (
  <>
        <Toolbar>
      {/* {user = null ? (
        <> */}
       
      
                  {/* </> */}
          {/* ) : (
                    <> */}
                    <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Back"
                onClick={history.goBack}
                edge="start"
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                href="/dashboad"
              >
                <DirectionsBus />
              </IconButton>

              <Typography variant="h6" className={classes.title}>
                Smart Travel
              </Typography>

              {auth && (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {/* {!user.formData.proPic ? ( */}
                      <AccountCircle />
                    {/* // ) : (  */}
                      {/* <img
                        src={user.formData.proPic}
                        className="rounded-circle"
                        width="40px"
                        height="40px"
                      ></img> */}
                  {/* //  )}
                  // &nbsp;
                    //  <Typography>{user.formData.name}</Typography> */}
                  </IconButton>
                  <Menu
                    style={{ marginTop: "50px", width: "500px" }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    open={openMenu}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/profile"
                    >
                      <AccountCircle /> &nbsp; Profile
                    </MenuItem>
                    <hr></hr>
                    <MenuItem className="text-danger" onClick={logOut}>
                      <SettingsPower /> &nbsp; Log Out
                    </MenuItem>
                  </Menu>
                </div>
                
              )}
             
              {/* </> */}
          {/* )}               */}
        </Toolbar>
     </>
)} 


      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon className={classes.ico}/>
            ) : (
              <ChevronRightIcon />
            )}
            <Typography className={classes.ico}>Back</Typography>
          </IconButton>
          <div className={classes.logo}>
          <DirectionsBus style={{width:"100px", height:"100px"}}/>
          </div>
          <div class={classes.smart}>
          <Typography style={{fontSize:"24px"}}>Smart Travel</Typography>
          </div>
        </div>
       
        <Divider />
        <List>
          {/* <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HouseIcon className={classes.ico}/>
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <Divider /> */}
          <ListItem button component={Link} to="/dashboad">
            <ListItemIcon>
              <Dashboard className={classes.ico}/>
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/addToken">
            <ListItemIcon>
              <AccountBalance className={classes.ico}/>
            </ListItemIcon>
            <ListItemText>Top up Token</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/selectLpackage">
            <ListItemIcon>
              <AirportShuttle className={classes.ico}/>
            </ListItemIcon>
            <ListItemText>Make a Tour</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/viewBuses">
            <ListItemIcon>
              <CalendarToday className={classes.ico}/>
            </ListItemIcon>
            <ListItemText>Shedules</ListItemText>
          </ListItem>
          <Divider />
          <Divider />
          <ListItem button component={Link} to="/history">
            <ListItemIcon>
              <DescriptionIcon className={classes.ico}/>
            </ListItemIcon>
            <ListItemText>History</ListItemText>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    </div>
  );
}
