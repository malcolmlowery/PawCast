import { combineReducers } from 'redux';
import { loginUserReducer } from './loginUserReducer';
import { postReducer } from './postsReducer';
import { userProfileReducer } from './userProfileReducer';

export const reducers = combineReducers({
  user: loginUserReducer,
  posts: postReducer,
  userProfile: userProfileReducer,
})