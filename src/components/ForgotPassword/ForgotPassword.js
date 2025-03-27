import React from 'react'
import Input from '../Auth/Input.js';
import useStyles from "./styles";
import toast from 'react-hot-toast';
import Loader from "../Loader/Loader.js";
import * as api from '../../api/index.js';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import {
  Grid,
  Grow,
  Paper,
  Avatar,
  Button,
  Container,
  Typography
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

let initialState = {
  otp: '',
  email: '',
  password: '',
};

const ForgotPassword = () => {

  const classes = useStyles();
  const history = useHistory();

  const [otpSent, setOtpSent] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [form, setForm] = React.useState(initialState);
  const [emailVerified, setEmailVerified] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const verifyEmail = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!form.email) {
      setLoading(false)
      toast.error('Email cannot be empty.')
    }
    else {
      try {
        const response = await api.verifyEmail(form);
        if (response.data.success) {
          setOtpSent(true)
          setLoading(false)
          setEmailVerified(true)
          toast.success(response.data.message)
        } else {
          setLoading(false)
          setEmailVerified(false)
          toast.error(response.data.message)
        }
      } catch (error) {
        setLoading(false)
        toast.error(error.message)
        setEmailVerified(true)
        history.push('/');
        window.location.reload();
      }
    }
  }

  const changePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!form.otp) {
      setLoading(false)
      toast.error('Otp cannot be empty.')
    }
    else if (!form.password) {
      setLoading(false)
      toast.error('Password cannot be Empty.')
    }
    else {
      try {
        const response = await api.ForgotPassword(form);
        if (response.data.success) {
          setOtpSent(true)
          setLoading(false)
          toast.success(response.data.message)
          history.push('/');
          window.location.reload();
        } else {
          setLoading(false)
          toast.error(response.data.message)
        }
      } catch (error) {
        setLoading(false)
        toast.error(error.message)
        history.push('/');
        window.location.reload();
      }
    }
  }

  return (
    <div>
      <Grow in>
        <Container>
          <Grid justifyContent="center" alignItems="center">
            <Grid>
              <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Change Password
                  </Typography>
                  <form className={classes.form}>
                    <Grid container spacing={2}>
                      <Input
                        type="email"
                        name="email"
                        label="Email Address"
                        disabled={emailVerified}
                        autoFocus
                        handleChange={handleChange}
                      />
                      {
                        emailVerified && <>
                          <Input
                            name="otp"
                            label="Otp"
                            type="number"
                            handleChange={handleChange}
                          />
                          <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            handleShowPassword={handleShowPassword}
                            type={showPassword ? "text" : "password"}
                          />
                        </>
                      }
                    </Grid>

                    {
                      !emailVerified ?
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={verifyEmail}
                          className={classes.submit}
                          fullWidth
                        >
                          Verify Email
                        </Button>
                        :
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          onClick={changePassword}
                          className={classes.submit}
                          fullWidth
                        >
                          Change Password
                        </Button>
                    }
                    {
                      !otpSent &&
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        textDecoration: 'none'
                      }}>
                        <Link to="/">
                          <Button className={classes.switchButton}>
                            Go back to login? Login
                          </Button>
                        </Link>
                      </div>
                    }
                  </form>
                </Paper>
              </Container>
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

export default ForgotPassword