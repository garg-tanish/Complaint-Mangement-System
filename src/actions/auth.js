import toast from 'react-hot-toast';
import * as api from '../api/index.js';

import { AUTH } from '../redux/actions/actionTypes.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const response = await api.signIn(formData);
    const token = response.data.token
    const result = response.data.result
    if (response.data.success) {
      toast.success(response.data.message)
      await dispatch({ type: AUTH, data: { result, token } });
      router.push('/');
      window.location.reload();
    } else {
      toast.error(response.data.message)
    }
  } catch (error) {
    toast.error(error.message)
    router.push('/');
    window.location.reload();
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const response = await api.signUp(formData);
    const token = response.data.token
    const result = response.data.result
    if (response.data.success) {
      toast.success(response.data.message)
      await dispatch({ type: AUTH, data: { result, token } });
      router.push('/');
      window.location.reload();
    } else {
      toast.error(response.data.message)
    }
  } catch (error) {
    toast.error(error)
    router.push('/');
    window.location.reload();
  }
};