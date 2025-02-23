import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import FilterListIcon from '@material-ui/icons/FilterList';

import {
  Grid,
  Typography,
  Grow,
  Container
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  const posts = useSelector((state) => {
    return user?.result?.isAdmin
      ? state?.postReducer || []
      : (state?.postReducer || []).filter((post) => post.email === user?.result?.email)
  }
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [post, setPost] = React.useState(posts)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  return (
    <Grow in>
      <Container>
        <FilterListIcon
          fontSize="large"
          aria-controls="customized-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{
            float: 'right',
            cursor: 'pointer'
          }}
        />
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem onClick={() => {
            handleClose()
            setPost(posts.filter((post) => post.state === 'Resolved'))
          }}>
            <ListItemText primary="Resolved" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => {
            handleClose()
            setPost(posts.filter((post) => post.state === 'Pending'))
          }}>
            <ListItemText primary="Pending" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => {
            handleClose()
            setPost(posts.filter((post) => post.state === 'Dismissed'))
          }}>
            <ListItemText primary="Dismissed" />
          </StyledMenuItem>
        </StyledMenu>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={10} md={8}>
            {!post.length ? (
              <Grid item xs={12} sm={4}>
                <Container className={classes.notFound}>
                  <Typography variant="h5">There no complaints </Typography>
                  <Link to="/">
                    <Typography variant="h6" color="secondary">
                      Back to the Homepage...
                    </Typography>
                  </Link>
                </Container>
              </Grid>
            ) : (
              <Grid
                className={classes.mainContainer}
                container
                spacing={4}
              >
                {post.map((post) => (
                  <Grid key={post._id} item xs={12} sm={10} md={6}>
                    <Post post={post} setCurrentId={setCurrentId} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Posts;