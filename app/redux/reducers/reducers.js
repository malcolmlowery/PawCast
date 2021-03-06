import { combineReducers } from 'redux';
import { chatroomReducer } from './chatroomReducer';
import { dobermannCounterReducer } from './dobermannCounterReducer';
import { loginUserReducer } from './loginUserReducer';
import { messagesReducer } from './messagesReducer';
import { postReducer } from './postsReducer';
import { premiumPostsReducer } from './premiumPosts';
import { premiumUserProfile } from './premiumUserProfile';
import { userLocationsReducer } from './userLocationsReducer';
import { userProfileReducer } from './userProfileReducer';
import { userReportingData } from './userReportingReducer';
import { addBusinessReducer } from '../actions/premiumAccountActions/addBusinessReducer';

export const reducers = combineReducers({
  user: loginUserReducer,
  posts: postReducer,
  userProfile: userProfileReducer,
  userLocationsData: userLocationsReducer,
  messages: messagesReducer,
  chatroom: chatroomReducer,
  dobermannCounter: dobermannCounterReducer,
  reportedUserData: userReportingData,
  premiumPosts: premiumPostsReducer,
  premiumProfile: premiumUserProfile,
  addBusiness: addBusinessReducer,
})