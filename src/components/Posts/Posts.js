import Post from "./Post/Post";
import useStyles from "./styles";

import {
  Grid,
  Typography,
  Grow,
  Container
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  const posts = useSelector((state) => {
    return user?.result?.isAdmin
      ? state?.postReducer || []
      : (state?.postReducer || []).filter((post) => post.email === user?.result?.email)
  }
  );

  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={10} md={8}>
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
                className={classes.mainContainer}
                container
                spacing={3}
              >
                {posts.map((post) => (
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
