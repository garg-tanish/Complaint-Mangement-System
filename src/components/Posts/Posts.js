import Post from "./Post/Post";
import useStyles from "./styles";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Typography, Grow, Container } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  const posts = useSelector((state) => {
    return user?.result?.isAdmin
      ? state?.postReducer || [] // Ensure it's an array
      : (state?.postReducer || []).filter((post) => post.email === user?.result?.email)
  }
  );

  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={8}>
            {!posts.length ? (
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
                className={classes.container}
                container
                alignItems="stretch"
                spacing={3}
              >
                {posts.map((post) => (
                  <Grid key={post._id} item xs={12} sm={6} md={6}>
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
