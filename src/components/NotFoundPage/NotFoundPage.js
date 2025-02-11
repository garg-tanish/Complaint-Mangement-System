import useStyles from "./styles";
import {
  Grid,
  Typography,
  Container,
  Grow,
} from "@material-ui/core";

import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Grow in>
      <Container>
        <Grid container justify="center" alignItems="stretch">
          <Grid item xs={12} sm={4}>
            <Container className={classes.notFound}>
              <Typography variant="h2">Sorry</Typography>
              <Typography variant="h5">This page cannot be found <br /> 404 Page </Typography>
              <Link to={user ? '/' : '/auth'}> <Typography variant="h6" color="secondary">
                {user ? 'Back to the Homepage...' : 'You are not Logged in yet.'}  </Typography></Link>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default NotFoundPage
