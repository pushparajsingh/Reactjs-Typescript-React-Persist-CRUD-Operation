import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  TaskState,
  TaskData,
} from '../Shared/Interfaces/taskList.interface';

const initialState: TaskState = {
  taskList: [],
};

type CheckBox = { name: string; toggle: boolean; id: string };

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addUserTask: (state, action: PayloadAction<TaskData>) => {
      state.taskList = [action.payload, ...state.taskList];
    },
    editUserTask: (state, action: PayloadAction<TaskData>) => {
      const newData = state.taskList.map((item: TaskData) => {
        if (action.payload.id == item.id) {
          return action.payload;
        }
        return item;
      });
      state.taskList = newData;
    },
    deleteUserTask: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter(
        (item: TaskData) => action.payload != item.id
      );
    },
    handleCheckBox: (state, action: PayloadAction<CheckBox>) => {
      console.log('result', action.payload);
      state.taskList.forEach((item: any) => {
        if (item.id == action.payload.id) {
          item[action.payload.name] = action.payload.toggle;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addUserTask,
  editUserTask,
  deleteUserTask,
  handleCheckBox,
} = taskSlice.actions;

export default taskSlice.reducer;
