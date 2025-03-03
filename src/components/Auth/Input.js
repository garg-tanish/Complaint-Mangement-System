import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {
  Grid,
  TextField,
  IconButton,
  InputAdornment
} from '@material-ui/core';

const Input = ({ name, handleChange, label, autoFocus, type, disabled, handleShowPassword }) => (
  <Grid item xs={12} sm={12}>
    <TextField
      variant="outlined"
      name={name}
      type={type}
      label={label}
      disabled={disabled}
      autoFocus={autoFocus}
      onChange={handleChange}
      required
      fullWidth
      InputProps={
        name === 'password' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        } : null
      }
    />
  </Grid>
);

export default Input;