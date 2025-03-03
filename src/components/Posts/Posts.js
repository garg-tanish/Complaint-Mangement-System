import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import FilterListIcon from '@material-ui/icons/FilterList';

import {
  Grid,
  Grow,
  List,
  Drawer,
  ListItem,
  Container,
  IconButton,
  Typography,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Close } from "@material-ui/icons";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  const posts = useSelector((state) => {
    return user?.result?.isAdmin
      ? state?.postReducer || []
      : (state?.postReducer || []).filter((post) => post.email === user?.result?.email)
  }
  );

  const [post, setPost] = React.useState(posts)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  return (
    <Grow in>
      <Container>
        <FilterListIcon
          fontSize="large"
          className={classes.filterButton}
          onClick={() => setDrawerOpen(true)}
        />
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <List className={classes.drawer}>
            <div className={classes.closeButton}>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <Close />
              </IconButton>
            </div>
            <ListItem button onClick={() => {
              setPost(posts)
              setDrawerOpen(false)
            }}>
              <ListItemText primary="All" />
            </ListItem>
            <ListItem button onClick={() => {
              setDrawerOpen(false)
              setPost(posts.filter((post) => post.state === 'Pending'))
            }}>
              <ListItemText primary="Pending" />
            </ListItem>
            <ListItem button onClick={() => {
              setDrawerOpen(false)
              setPost(posts.filter((post) => post.state === 'Resolved'))
            }}>
              <ListItemText primary="Resolved" />
            </ListItem>
            <ListItem button onClick={() => {
              setDrawerOpen(false)
              setPost(posts.filter((post) => post.state === 'Dismissed'))
            }}>
              <ListItemText primary="Dismissed" />
            </ListItem>
            {
              user?.result?.isAdmin &&
              <>
                <ListItem button onClick={() => {
                  setDrawerOpen(false)
                  setPost(posts.filter((post) => post.priority === 2))
                }}>
                  <ListItemText primary="High Priority" />
                </ListItem>
                <ListItem button onClick={() => {
                  setDrawerOpen(false)
                  setPost(posts.filter((post) => post.priority === 0))
                }}>
                  <ListItemText primary="Low Priority" />
                </ListItem>
                <ListItem button onClick={() => {
                  setDrawerOpen(false)
                  setPost(posts.filter((post) => post.priority === 1))
                }}>
                  <ListItemText primary="Medium Priority" />
                </ListItem>
              </>
            }
          </List>
        </Drawer>

        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={10} md={8}>
            {
              !post.length ?
                <div className={classes.notFound}>
                  <Typography variant="h5">
                    There no complaints
                  </Typography>
                  <Link to="/">
                    <Typography variant="h6" color="secondary">
                      Back to the Homepage...
                    </Typography>
                  </Link>
                </div>
                :
                <Grid
                  spacing={4}
                  className={classes.mainContainer}
                  container
                  style={{ marginBottom: '20px' }}
                >
                  {
                    post.map((post) =>
                      <Grid key={post._id} item xs={12} sm={10} md={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                      </Grid>
                    )}
                </Grid>
            }
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Posts;