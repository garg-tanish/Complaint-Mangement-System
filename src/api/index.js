import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const fetchPosts = () => API.get('/posts');
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const SendEmail = (formData) => API.post('/send-email', formData);
export const verifyEmail = (formData) => API.post('/user/verify-email', formData);
export const ForgotPassword = (formData) => API.post('/forgot-password', formData);
export const verifySignin = (formData) => API.post('/user/verify-signin', formData);
export const verifySignup = (formData) => API.post('/user/verify-signup', formData);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const updateConvo = (id, updatedConvo) => API.patch(`/posts/update-convo/${id}`, updatedConvo);
export const changePassword = (formData) => API.post('user/change-password', formData);