import {
  AppBar,
  Typography,
  Avatar,
  Grid,
  Toolbar,
  IconButton,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from 'react';
import useStyles from "./styles";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    setUser(null);
    localStorage.clear();
    history.push('/auth');
    window.location.reload();
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar position="static">
      <Toolbar>
        {
        user ? (
          <>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar className={classes.avatar}> { user?.result.name.charAt(0).toUpperCase()  || 'H' } </Avatar>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {user?.result.name || "User Name"}
            </Typography>
            <div className={classes.dashboard}>
            <Link to="/dashboard" className={classes.link}>
              {"Dashboard"}
            </Link>
            <Link to="/" className={classes.link}>
              {"Home"}
            </Link>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
            </>
            ) :
            (
            <Link to="/auth" className={classes.link}>
              {"Sign In"}
            </Link>
            )
            }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
