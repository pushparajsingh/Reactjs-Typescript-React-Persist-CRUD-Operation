import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { deleteUserTask } from '../../Redux/TaskSlice';
import { useDispatch } from 'react-redux';
import { confirmModel } from '../../Shared/Interfaces/taskList.interface';

const ConfirmationModal = ({
  delToggle,
  setDelToggle,
  id,
  setIsLoading,
}: confirmModel) => {
  const dispatch = useDispatch();
  const closeModel = () => {
    setDelToggle(false);
  };
  const deleteTask = () => {
    dispatch(deleteUserTask(id));
    closeModel();
    setIsLoading(true);
  };
  return (
    <Dialog fullWidth={true} open={delToggle}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to delete?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => closeModel()}
          color="error"
          variant="contained"
        >
          Disagree
        </Button>
        <Button
          onClick={() => deleteTask()}
          variant="contained"
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmationModal;
