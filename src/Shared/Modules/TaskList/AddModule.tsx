import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { generateId } from '../../../Utilis/Utilis';
import { useDispatch } from 'react-redux';
import { addUserTask } from '../../../Redux/TaskSlice';
import {
  TaskData,
  AddModelType,
} from '../../Interfaces/taskList.interface';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddModule = (props: AddModelType) => {
  const dispatch = useDispatch();
  const [addTask, setAddTask] = useState<TaskData>({
    id: '1',
    taskName: '',
    status: false,
    favourite: false,
    date: dayjs(new Date()),
  });
  const [error, setError] = useState<String>('');
  const handleClose = () => {
    setAddTask({
      id: '',
      taskName: '',
      status: false,
      favourite: false,
      date: dayjs(new Date()),
    });
    setError('');
    props.setAddToggle(false);
  };

  const handleChange = (name: string, e: Dayjs | string | null) => {
    setAddTask({ ...addTask, [name]: e });
  };
  const handleSubmit = () => {
    addTask.taskName == '' && setError('Please Fill the task...');
    if (addTask.taskName != '') {
      const newData: TaskData = { ...addTask };
      newData.id = generateId();
      dispatch(addUserTask(newData));
      handleClose();
      props.setIsLoading(true);
    }
  };
  return (
    <div>
      <Modal
        open={props.addToggle}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            New Task
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="filled-basic"
              label="Task"
              variant="filled"
              onChange={(e) =>
                handleChange('taskName', e.target.value)
              }
              value={addTask.taskName}
              fullWidth
            />
            {error && <p className="text-danger">{error}</p>}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Basic date picker"
                  className="date-picker-module"
                  value={addTask.date}
                  onChange={(e) => handleChange('date', e)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <div className="d-flex justify-content-end mt-3">
              <div>
                <Button
                  variant="contained"
                  color="error"
                  style={{ marginRight: '10px' }}
                  onClick={() => handleClose()}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleSubmit()}
                >
                  Add Task
                </Button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default AddModule;