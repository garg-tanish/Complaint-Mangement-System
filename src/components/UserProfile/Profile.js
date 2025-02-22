import React from 'react'
import useStyles from "./styles";
import toast from 'react-hot-toast';
import * as api from '../../api/index.js';

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
  const [form, setForm] = React.useState({
    email: user?.result?.email,
    password: '',
    newPassword: ''
  })

  const [changePasswordClick, setChangePasswordClick] = React.useState(false)

  const changePassword = async (e) => {
    e.preventDefault()
    try {
      const response = await api.changePassword(form);
      if (response.data.success) {
        toast.success(response.data.message)
        history.push('/');
        window.location.reload();
      } else {
        toast.error(response.data.message)
        history.push('/');
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.message)
      history.push('/');
      window.location.reload();
    }

  }

  const close = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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

                  {
                    changePasswordClick &&
                    <>
                      <TextField
                        name="password"
                        id='password'
                        variant="outlined"
                        label="Password"
                        required
                        fullWidth
                        value={form.password}
                        onChange={handleChange}
                      />
                      <TextField
                        name="newPassword"
                        id='newPassword'
                        variant="outlined"
                        label="New Password"
                        required
                        fullWidth
                        value={form.newPassword}
                        onChange={handleChange}
                      />
                    </>
                  }
                  {
                    !changePasswordClick ?
                      <Button
                        className={classes.buttonClear}
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => setChangePasswordClick(true)}
                        fullWidth
                      >
                        Change Password
                      </Button>
                      :
                      <Button
                        className={classes.buttonClear}
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={changePassword}
                        fullWidth
                      >
                        Submit
                      </Button>
                  }
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