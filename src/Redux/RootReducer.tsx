import { combineReducers } from '@reduxjs/toolkit';
import TaskSlice from './TaskSlice';

const RootReducer = combineReducers({
  task: TaskSlice,
});
export default RootReducer;
