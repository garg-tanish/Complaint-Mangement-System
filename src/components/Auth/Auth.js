import React from "react";
import Icon from "./Icon";
import Input from "./Input";
import useStyles from "./styles";
import toast from 'react-hot-toast';
import * as api from '../../api/index.js';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Grow
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { AUTH } from "../../redux/actions/actionTypes";
import { signin, signup } from "../../actions/auth";

let initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  isAdmin: false,
  otp: '',
  department: '',
  batch: ''
};

const SignUp = ({ admin = false }) => {
  initialState.isAdmin = admin;

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [otpSent, setOtpSent] = React.useState(false)
  const [form, setForm] = React.useState(initialState);
  const [isSignup, setIsSignup] = React.useState(admin);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const verifySignup = async () => {
    try {
      const response = await api.verifySignup(form);
      if (response.data.success) {
        toast.success(response.data.message)
        setOtpSent(true)
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

  const verifySignin = async () => {
    try {
      const response = await api.verifySignin(form);
      if (response.data.success) {
        toast.success(response.data.message)
        setOtpSent(true)
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

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const send_otp = (e) => {
    e.preventDefault()
    if (isSignup) {
      if (form.password === form.confirmPassword) verifySignup()
      else toast.error('Password & Confirm password are not same.')

    } else verifySignin()
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push("/");
      window.location.reload();
    } catch (error) {
      toast.error(error)
    }
  };

  const googleError = () =>
    toast.error("Google SignIn was unsuccessful. Try again later");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="center" alignItems="center">
          <Grid>
            <Container component="main" maxWidth="xs">
              <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  {
                    isSignup ? "Sign up" : "Sign in"
                  }
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    {
                      isSignup && (
                        <>
                          <Input
                            name="firstName"
                            label="First Name"
                            handleChange={handleChange}
                            autoFocus
                            required
                            disabled={otpSent}
                          />
                          <Input
                            name="lastName"
                            label="Last Name"
                            required
                            handleChange={handleChange}
                            disabled={otpSent}
                          />
                        </>
                      )}
                    <Input
                      name="email"
                      label="Email Address"
                      handleChange={handleChange}
                      type="email"
                      required
                      disabled={otpSent}
                    />
                    <Input
                      name="password"
                      label="Password"
                      handleChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      handleShowPassword={handleShowPassword}
                      disabled={otpSent}
                      required
                    />
                    {
                      isSignup && (
                        <>
                          <Input
                            name="department"
                            label="Department"
                            handleChange={handleChange}
                            disabled={otpSent}
                            required
                          />
                          <Input
                            name="batch"
                            label="Batch"
                            handleChange={handleChange}
                            disabled={otpSent}
                            required
                          />
                          <Input
                            name="confirmPassword"
                            label="Repeat Password"
                            handleChange={handleChange}
                            type="password"
                            disabled={otpSent}
                          />
                        </>
                      )}

                    {
                      otpSent && (
                        <Input
                          name="otp"
                          label="Otp"
                          handleChange={handleChange}
                          type="number"
                        />
                      )}
                  </Grid>

                  {
                    !otpSent && <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={send_otp}
                      disabled={otpSent}
                    >
                      Send Otp
                    </Button>
                  }

                  {
                    otpSent && <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                  }

                  {
                    !admin && !otpSent && (
                      <>
                        <GoogleLogin
                          clientId='50161686094-c0803lbaoes45ce6l51ae9p5ees3sgfh.apps.googleusercontent.com'
                          render={(renderProps) => (
                            <Button
                              className={classes.googleButton}
                              color="secondary"
                              fullWidth
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                              startIcon={<Icon />}
                              variant="contained"
                            >
                              Google Sign In
                            </Button>
                          )}
                          onSuccess={googleSuccess}
                          onFailure={googleError}
                          cookiePolicy="single_host_origin"
                        />
                        <Grid container justifyContent="center">
                          <Grid item>
                            <Button onClick={switchMode}>
                              {isSignup
                                ? "Already have an account? Sign in"
                                : "Don't have an account? Sign Up"}
                            </Button>
                          </Grid>
                        </Grid>
                      </>
                    )}
                </form>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default SignUp;
