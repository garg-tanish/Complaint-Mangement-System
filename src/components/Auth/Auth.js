import React from "react";
import Input from "./Input";
import useStyles from "./styles";
import toast from 'react-hot-toast';
import Loader from "../Loader/Loader.js";
import FileBase from "react-file-base64";
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
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

let initialState = {
  otp: '',
  email: '',
  batch: '',
  password: '',
  lastName: '',
  firstName: '',
  department: '',
  profile_pic: '',
  isAdmin: false
};

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [otpSent, setOtpSent] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [form, setForm] = React.useState(initialState);
  const [isSignup, setIsSignup] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleFileUpload = ({ base64, file }) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Your selected file is not an image file so it will be not be shown");
      setForm({ ...form, profile_pic: '' });
    }
    else {
      setLoading(true);
      setTimeout(() => {
        setForm({ ...form, profile_pic: base64 });
        setLoading(false);
      }, 1500);
    }
  };

  const validateInput = (e) => {
    e.preventDefault()
    setLoading(true)
    if (isSignup) {
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!form.firstName) {
        setLoading(false)
        toast.error('Firstname cannot be empty.')
      }
      else if (!form.lastName) {
        setLoading(false)
        toast.error('Lastname cannot be empty.')
      }
      else if (!gmailRegex.test(form.email)) {
        setLoading(false)
        toast.error('Enter valid Gmail only.')
      }
      else if (form.password.length < 6) {
        setLoading(false)
        toast.error('Password should be atleast 6 character long.')
      }
      else if (!form.department) {
        setLoading(false)
        toast.error('Department cannot be empty.')
      }
      else if (!form.batch) {
        setLoading(false)
        toast.error('Batch cannot be empty.')
      }
      else verifySignup()
    }
    else {
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!gmailRegex.test(form.email)) {
        setLoading(false)
        toast.error('Enter valid Gmail only.')
      }
      else if (!form.password) {
        setLoading(false)
        toast.error('Password cannot be empty.')
      }
      else verifySignin(e)
    }
  }

  const verifySignup = async () => {
    try {
      const response = await api.verifySignup(form);
      if (response.data.success) {
        setOtpSent(true)
        setLoading(false)
        toast.success(response.data.message)
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

  const verifySignin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.verifySignin(form);
      if (response.data.success) {
        setOtpSent(true)
        setLoading(false)
        toast.success(response.data.message)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  return (
    <div>
      <Grow in>
        <Container>
          <Grid container justifyContent="center" alignItems="center">
            <Grid>
              <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                  <Avatar className={classes.avatar}>
                    {
                      form.profile_pic ?
                        <img src={form.profile_pic} alt="dp" className={classes.profile_pic} /> :
                        <LockOutlinedIcon />
                    }
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
                              disabled={otpSent}
                              handleChange={handleChange}
                              autoFocus
                            />
                            <Input
                              name="lastName"
                              label="Last Name"
                              disabled={otpSent}
                              handleChange={handleChange}
                            />
                          </>
                        )}
                      <Input
                        type="email"
                        name="email"
                        label="Email Address"
                        disabled={otpSent}
                        autoFocus={!isSignup}
                        handleChange={handleChange}
                      />
                      <Input
                        name="password"
                        label="Password"
                        disabled={otpSent}
                        handleChange={handleChange}
                        handleShowPassword={handleShowPassword}
                        type={showPassword ? "text" : "password"}
                      />
                      {
                        isSignup && (
                          <>
                            <Input
                              name="department"
                              label="Department"
                              disabled={otpSent}
                              handleChange={handleChange}
                            />
                            <Input
                              name="batch"
                              label="Batch"
                              disabled={otpSent}
                              handleChange={handleChange}
                            />
                            {
                            !otpSent &&
                            <div className={classes.fileInput}>
                              <FileBase
                                type="file"
                                multiple={false}
                                onDone={handleFileUpload}
                              />
                            </div>
                            }
                          </>
                        )}

                      {
                        otpSent &&
                        <Input
                          name="otp"
                          label="Otp"
                          type="number"
                          handleChange={handleChange}
                        />
                      }
                    </Grid>

                    {
                      !otpSent ?
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={validateInput}
                          className={classes.submit}
                          fullWidth
                        >
                          {
                            isSignup ? "Register" : "Verify Credentials"
                          }
                        </Button>
                        :
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          className={classes.submit}
                          fullWidth
                        >
                          {
                            isSignup ? "Sign Up" : "Sign In"
                          }
                        </Button>
                    }

                    {
                      !otpSent &&
                      <Grid container justifyContent="center">
                        <Button
                          onClick={switchMode}
                          className={classes.switchButton}
                        >
                          {
                            isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign Up"
                          }
                        </Button>
                        {
                          !isSignup &&
                          <Link to="/forgot-password">
                            <Button className={classes.switchButton}>
                              Forgot Password?
                            </Button>
                          </Link>
                        }
                      </Grid>
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
  );
};

export default SignUp;