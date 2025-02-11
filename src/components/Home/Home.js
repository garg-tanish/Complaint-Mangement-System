import { Grid, Grow, Container } from "@material-ui/core";
import CardItem from "./Card/Card.js";
import useStyles from "./styles";
import { useState } from "react";

const Home = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <Grow in>
      <Container>
        <Grid container justify="center" alignItems="stretch">
          <Grid item xs={12} sm={7}>
            <Grid
              className={classes.container}
              container
              alignItems="stretch"
              spacing={3}
            >
              <Grid key="1" item xs={12} sm={6} md={6}>
                <CardItem title="Create a Complaint" link="/create" />
              </Grid>

              <Grid key="2" item xs={12} sm={6} md={6}>
                <CardItem title="View The Complaints" link="/dashboard" />
              </Grid>

              {user.result.isAdmin && (
                <Grid key="3" item xs={12} sm={6} md={6}>
                  <CardItem
                    title="Create an Admin Account"
                    link="/auth/admin"
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
