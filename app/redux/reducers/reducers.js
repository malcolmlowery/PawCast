import { combineReducers } from 'redux';
import { loginUserReducer } from './loginUserReducer';
import { postReducer } from './postsReducer';

export const reducers = combineReducers({
  user: loginUserReducer,
  posts: postReducer,
})