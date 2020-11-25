import { combineReducers } from 'redux';
import { chatroomReducer } from './chatroomReducer';
import { loginUserReducer } from './loginUserReducer';
import { messagesReducer } from './messagesReducer';
import { postReducer } from './postsReducer';
import { userLocationsReducer } from './userLocationsReducer';
import { userProfileReducer } from './userProfileReducer';

export const reducers = combineReducers({
  user: loginUserReducer,
  posts: postReducer,
  userProfile: userProfileReducer,
  userLocationsData: userLocationsReducer,
  messages: messagesReducer,
  chatroom: chatroomReducer,
})