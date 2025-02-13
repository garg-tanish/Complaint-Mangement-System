import thunk from 'redux-thunk';
import postReducer from './reducers/postReducer';
import authReducer from './reducers/authReducer';

import { configureStore, combineReducers } from '@reduxjs/toolkit';

const reducers = combineReducers({ postReducer, authReducer });

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;