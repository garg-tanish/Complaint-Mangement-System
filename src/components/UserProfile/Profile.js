import React from 'react'
import useStyles from "./styles";
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader.js'
import * as api from '../../api/index.js';

import {
  Grid,
  Grow,
  Paper,
  Button,
  TextField,
  Container
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [loading, setLoading] = React.useState(false);
  const [changePasswordClick, setChangePasswordClick] = React.useState(false)
  const [form, setForm] = React.useState({
    email: user?.result?.email,
    password: '',
    newPassword: ''
  })

  const changePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (form.password && form.newPassword) {
        const response = await api.changePassword(form);
        if (response.data.success) {
          setLoading(false)
          toast.success(response.data.message)
          history.push('/');
        } else {
          setLoading(false)
          toast.error(response.data.message)
          history.push('/');
        }
      }
      else toast.error('Password is required.')
    } catch (error) {
      setLoading(false)
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
    <div>
      <Grow in>
        <Container>
          <Grid container justifyContent="center" alignItems="stretch">
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <form className={`${classes.root} ${classes.form}`}>
                  <Grid container spacing={2}>
                    <TextField
                      id="name"
                      name="name"
                      label="Name"
                      variant="outlined"
                      value={user?.result?.name}
                      disabled
                      fullWidth
                    />
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      value={user?.result?.email}
                      disabled
                      fullWidth
                    />
                    {
                      !user?.result?.isAdmin &&
                      <>
                        <TextField
                          id='department'
                          name="department"
                          label="Department"
                          variant="outlined"
                          value={user?.result?.department}
                          disabled
                          fullWidth
                        />
                        <TextField
                          id='batch'
                          name="batch"
                          label="Batch"
                          variant="outlined"
                          value={user?.result?.batch}
                          disabled
                          fullWidth
                        />
                      </>
                    }

                    {
                      changePasswordClick &&
                      <>
                        <TextField
                          id='password'
                          name="password"
                          label="Password"
                          variant="outlined"
                          value={form.password}
                          onChange={handleChange}
                          required
                          autoFocus
                          fullWidth
                        />
                        <TextField
                          id='newPassword'
                          name="newPassword"
                          variant="outlined"
                          label="New Password"
                          onChange={handleChange}
                          value={form.newPassword}
                          required
                          fullWidth
                        />
                      </>
                    }
                    {
                      !changePasswordClick ?
                        <Button
                          size="large"
                          color="primary"
                          variant="contained"
                          className={classes.button}
                          onClick={() => setChangePasswordClick(true)}
                          fullWidth
                        >
                          Change Password
                        </Button>
                        :
                        <Button
                          size="large"
                          color="primary"
                          variant="contained"
                          onClick={changePassword}
                          className={classes.button}
                          fullWidth
                        >
                          Submit
                        </Button>
                    }
                    <Button
                      size="large"
                      color="secondary"
                      variant="contained"
                      onClick={close}
                      className={classes.button}
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
      {
        loading && <Loader />
      }
    </div>
  )
}

export default Profile