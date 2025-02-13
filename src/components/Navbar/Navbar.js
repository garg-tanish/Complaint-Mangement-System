import React from 'react';
import decode from 'jwt-decode';
import useStyles from "./styles";
import * as actionType from '../../redux/actions/actionTypes';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Fab,
} from "@material-ui/core";

import { useDispatch } from 'react-redux';
import { Menu, Close, KeyboardArrowUp } from "@material-ui/icons";
import { Link, useHistory, useLocation } from 'react-router-dom';

const Navbar = () => {

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showScroll, setShowScroll] = React.useState(false);
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('profile')));

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    setUser(null);
    localStorage.clear();
    history.push('/auth');
    window.location.reload();
  };

  React.useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
    // eslint-disable-next-line
  }, [location]);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>

          <Avatar className={classes.avatar}>
            {user?.result.name?.charAt(0).toUpperCase() || "H"}
          </Avatar>

          <Typography variant="h6" className={classes.title}>
            {user?.result.name || "User Name"}
          </Typography>

          {isMobile && (
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </IconButton>
          )}

          {!isMobile ? (
            <div className={classes.dashboard}>
              <Link to="/dashboard" className={classes.link}>
                Dashboard
              </Link>
              <Link to="/" className={classes.link}>
                Home
              </Link>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
            >
              <List className={classes.drawer}>
                <div className={classes.closeButton}>
                  <IconButton onClick={() => setMobileOpen(false)}>
                    <Close />
                  </IconButton>
                </div>
                <ListItem button onClick={() => setMobileOpen(false)} component={Link} to="/dashboard">
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={() => setMobileOpen(false)} component={Link} to="/">
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={logout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </Drawer>
          )}
        </Toolbar>
      </AppBar>

      {showScroll && (
        <Fab
          className={classes.moveToTop}
          size="small"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <KeyboardArrowUp />
        </Fab>
      )}
    </>
  );
};

export default Navbar;