import { combineReducers } from 'redux';
import { loginUserReducer } from './loginUserReducer';

export const reducers = combineReducers({
  user: loginUserReducer,
})