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
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const verifyOtp = (formData) => API.post('/verify-otp', formData);
export const sendOtp = (formData) => API.post('/email/sendOtp', formData);
export const SendEmail = (formData) => API.post('/email/sendEmail', formData);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
