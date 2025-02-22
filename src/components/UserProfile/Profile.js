import React from 'react'
import useStyles from "./styles";

import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Grow,
  Container,
  Paper
} from "@material-ui/core";

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("profile"));

  const close = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <form className={`${classes.root} ${classes.form}`}>
                <Grid container spacing={2}>
                  <TextField
                    name="Name"
                    variant="outlined"
                    disabled
                    fullWidth
                    id="Name"
                    label="Name"
                    value={user?.result?.name}
                  />
                  <TextField
                    variant="outlined"
                    disabled
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={user?.result?.email}
                  />
                  <TextField
                    name="password"
                    id='password'
                    variant="outlined"
                    label="Password"
                    disabled
                    fullWidth
                    value={user?.result?.password}
                  />
                  <TextField
                    name="department"
                    id='department'
                    variant="outlined"
                    label="Department"
                    disabled
                    fullWidth
                    value={user?.result?.department}
                  />
                  <TextField
                    name="batch"
                    id='batch'
                    variant="outlined"
                    label="Batch"
                    disabled
                    fullWidth
                    value={user?.result?.batch}
                  />
                  <TextField
                    name="admin"
                    id='admin'
                    variant="outlined"
                    label="Are You admin?"
                    fullWidth
                    disabled
                    value={user?.result?.isAdmin}
                  />
                  <Button
                    className={classes.buttonClear}
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={close}
                    fullWidth
                  >
                    Close
                  </Button>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Profile