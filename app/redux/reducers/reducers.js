import { combineReducers } from 'redux';
import { chatroomReducer } from './chatroomReducer';
import { dobermannCounterReducer } from './dobermannCounterReducer';
import { loginUserReducer } from './loginUserReducer';
import { messageSessionReducer } from './messageSessionReducer';
import { messagesReducer } from './messagesReducer';
import { postReducer } from './postsReducer';
import { userLocationsReducer } from './userLocationsReducer';
import { userProfileReducer } from './userProfileReducer';
import { userReportingData } from './userReportingReducer';

export const reducers = combineReducers({
  user: loginUserReducer,
  posts: postReducer,
  userProfile: userProfileReducer,
  userLocationsData: userLocationsReducer,
  messages: messagesReducer,
  chatroom: chatroomReducer,
  message_session: messageSessionReducer,
  dobermannCounter: dobermannCounterReducer,
  reportedUserData: userReportingData,
})