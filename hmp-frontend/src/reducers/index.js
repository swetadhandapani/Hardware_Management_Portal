import { combineReducers } from 'redux';
import userReducer from './userReducer';
import employeeReducer from './employeeReducer';

const rootReducer = combineReducers({
  user: userReducer,
  employee: employeeReducer,
});

export default rootReducer;
