import React from "react";
import useStyles from "./styles";
import CardItem from "./Card/Card.js";

import {
  Grid,
  Grow,
  Container
} from "@material-ui/core";

const Home = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={10} md={8}>
            <Grid
              alignItems="center"
              justifyContent="center"
              spacing={3}
              className={classes.mainContainer}
              container
            >
              {
                !user.result.isAdmin &&
                <Grid key="1" item xs={12} sm={8} md={6}>
                  <CardItem title="Create a Complaint" link="/create" />
                </Grid>
              }
              <Grid key="2" item xs={12} sm={8} md={6}>
                <CardItem title="View The Complaints" link="/dashboard" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;