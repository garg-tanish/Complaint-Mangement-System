import toast from 'react-hot-toast';
import * as api from '../api/index.js';

import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../redux/actions/actionTypes.js';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    toast.error(error.message)
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const response = await api.createPost(post);
    const user = JSON.parse(localStorage.getItem("profile"));
    const emailData = {
      email: `${user?.result?.email}`,
      subject: `New Complaint from ${user?.result?.name}`,
      content: `${user?.result?.name} has a registered a complaint about ${post.title} saying the issue ${post.content}`,
      reciever: 'both'
    }
    if (response.data.success) {
      toast.success('Complaint registered.')
      dispatch({ type: CREATE, payload: response.data.newPostMessage });
      try {
        await api.SendEmail(emailData)
      } catch (error) {
        toast.error(error.message)
      }
    }
    else {
      toast.error('Unable to add Complaint.')
    }
  } catch (error) {
    toast.error(error.message)
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    toast.error(error.message)
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    toast.error(error.message)
  }
};