import toast from 'react-hot-toast';
import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    router.push('/');
    window.location.reload();
  } catch (error) {
    toast.error(error)
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    router.push('/');
    window.location.reload();
  } catch (error) {
    toast.error(error)
  }
};
