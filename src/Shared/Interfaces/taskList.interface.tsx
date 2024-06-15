import React, { ReactElement } from 'react';
import dayjs, { Dayjs } from 'dayjs';

export interface IProps {
  label: string;
  loading: boolean;
}
export interface FooProps extends React.PropsWithChildren {
  name: 'foo';
  children: ReactElement;
}
export interface TaskData {
  id: string;
  taskName: string;
  status: boolean;
  favourite: boolean;
  date: Dayjs | null;
}

export interface TaskState {
  taskList: TaskData[];
}

export interface confirmModel {
  delToggle: boolean;
  setDelToggle: any;
  id: string;
  setIsLoading: any;
}
export interface AddModelType {
  addToggle: boolean;
  setAddToggle: any;
  setIsLoading: any;
}

export interface EditModelType {
  editToggle: boolean;
  setEditToggle: any;
  editData: TaskData;
  setIsLoading: any;
}