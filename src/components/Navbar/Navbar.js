import React from 'react';
import decode from 'jwt-decode';
import useStyles from "./styles";
import * as actionType from '../../redux/actions/actionTypes';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

import {
  Fab,
  List,
  AppBar,
  Avatar,
  Drawer,
  Toolbar,
  ListItem,
  IconButton,
  Typography,
  ListItemText,
  useMediaQuery
} from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Menu, Close, KeyboardArrowUp } from "@material-ui/icons";

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showScroll, setShowScroll] = React.useState(false);
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('profile')));

  const confirmLogout = () => {
    const confirmation = window.confirm('Are you sure to logout?')
    if (confirmation) logout()
    else return
  }

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
      if (decodedToken.exp * 1000 < new Date().getTime())
        logout();
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

        {
          user ?
            <Toolbar>
              <Link to="/user-profile" style={{ fontSize: 20, textDecoration: 'none' }}>
                <Avatar className={classes.avatar}>
                  {
                    user?.result.name?.split(" ").map(word => word.charAt(0)).join("").toUpperCase() || "U"
                  }
                </Avatar>
              </Link>
              <Typography variant="h6" className={classes.title}>
                {
                  user?.result.name || "User Name"
                }
              </Typography>

              {
                isMobile &&
                <IconButton
                  edge="end"
                  color="inherit"
                  className={classes.menuButton}
                  onClick={() => setMobileOpen(true)}
                >
                  <Menu />
                </IconButton>
              }

              {
                !isMobile ?
                  <div className={classes.dashboard}>
                    <Link to="/" className={classes.link}>
                      Home
                    </Link>
                    <Link to="/dashboard" className={classes.link}>
                      Dashboard
                    </Link>
                    <ExitToAppRoundedIcon
                      fontSize='large'
                      color='secondary'
                      onClick={confirmLogout}
                      className={classes.logout}
                    />
                  </div>
                  :
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
                      <ListItem button onClick={() => setMobileOpen(false)} component={Link} to="/">
                        <ListItemText primary="Home" />
                      </ListItem>
                      <ListItem button onClick={() => setMobileOpen(false)} component={Link} to="/dashboard">
                        <ListItemText primary="Dashboard" />
                      </ListItem>
                      <ListItem button onClick={logout}>
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </List>
                  </Drawer>
              }
            </Toolbar>
            :
            <Toolbar>
              <Typography variant="h6" className={classes.heading}>
                Welcome To Complaint System
              </Typography>
            </Toolbar>
        }
      </AppBar>

      {
        showScroll &&
        <Fab
          size="small"
          className={classes.moveToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <KeyboardArrowUp />
        </Fab>
      }
    </>
  );
};

export default Navbar;