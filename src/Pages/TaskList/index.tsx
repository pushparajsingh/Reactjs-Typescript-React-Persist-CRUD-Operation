import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../../Asserts/Scss/TaskList.scss';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import TableNoRecordFound from '../../Components/Table/TableNoRecordFound';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddModule from '../../Shared/Modules/TaskList/AddModule';
import EditModule from '../../Shared/Modules/TaskList/EditModule';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ConfirmationModal from '../../Components/Modal/ConfirmationModal';
import { handleCheckBox } from '../../Redux/TaskSlice';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import {
  TaskState,
  TaskData,
} from '../../Shared/Interfaces/taskList.interface';

export default function BasicTable() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const dispatch = useDispatch();
  const { taskList }: TaskState = useSelector(
    (state: any) => state.task
  );
  const [editData, setEditData] = useState<TaskData>({
    id: '',
    taskName: '',
    status: false,
    favourite: false,
    date: dayjs(new Date()),
  });
  const [addToggle, setAddToggle] = useState<boolean>(false);
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [delToggle, setDelToggle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deleteId, setDeleteId] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<string>('All');
  const [shortDate, setShortDate] = useState<boolean>(true);
  const AddTask = () => {
    setAddToggle(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [isLoading]);

  const handleEdit = (row: TaskData) => {
    setEditData(row);
    setEditToggle(true);
  };
  const deleteTask = (id: string) => {
    setDeleteId(id);
    setDelToggle(true);
  };
  const handleCheckbox = (
    name: string,
    toggle: boolean,
    id: string
  ) => {
    dispatch(handleCheckBox({ name, toggle, id }));
  };
  const handleTaskStatus = (status: string) => {
    setTaskStatus(status);
  };

  const data = useMemo(() => {
    const shorting = taskList.filter((item: any) => {
      let status =
        taskStatus != 'All' ? true == item[taskStatus] : true;
      return status;
    });

    shortDate &&
      shorting.sort(function (a: any, b: any): any {
        return (
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      });
    !shortDate &&
      shorting.sort(function (a: any, b: any): any {
        return (
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      });
    return shorting;
  }, [taskStatus, taskList, shortDate]);

  const handleShortToggle = () => {
    setShortDate((x) => !x);
  };
  return (
    <>
      <div className="d-flex justify-content-between my-2">
        <div>
          <h3 className="d-inline">Task Management Application</h3>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={taskStatus}
            inputProps={{ 'aria-label': 'Without label' }}
            className="resize-Selector"
            onChange={(e) => handleTaskStatus(e.target.value)}
          >
            <MenuItem value={'All'}>All Task</MenuItem>
            <MenuItem value={'status'}>Completed Task</MenuItem>
            <MenuItem value={'favourite'}>Favourite Task</MenuItem>
          </Select>
        </div>
        <Tooltip title="Add Task">
          <Button
            variant="contained"
            className="btn-size"
            onClick={AddTask}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
      <TableContainer component={Paper}>
        <div className="taskboard-table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="fw-bolder">Task No.</TableCell>
                <TableCell className="fw-bolder">Task</TableCell>
                <TableCell className="fw-bolder">
                  <Tooltip title={'Date Shorting'}>
                    <a
                      href="#"
                      className="text-decoration-none text-black"
                      onClick={() => handleShortToggle()}
                    >
                      Date{' '}
                      {shortDate ? (
                        <KeyboardArrowDownIcon className="cursor" />
                      ) : (
                        <KeyboardArrowUpIcon className="cursor" />
                      )}
                    </a>
                  </Tooltip>
                </TableCell>
                <TableCell className="fw-bolder">Status</TableCell>
                <TableCell className="fw-bolder">Favourite</TableCell>
                <TableCell className="fw-bolder">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                data?.map((row: any, index: number) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.taskName}</TableCell>
                    <TableCell>
                      {moment(row.date).format('MMM Do YY')}
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title={
                          row.status ? 'Completed' : 'Not Completed'
                        }
                      >
                        <Checkbox
                          {...label}
                          color="success"
                          defaultChecked={row.status}
                          onChange={() =>
                            handleCheckbox(
                              'status',
                              !row.status,
                              row.id
                            )
                          }
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title={
                          row.favourite
                            ? 'Favourite'
                            : 'Not Favourite'
                        }
                      >
                        <Checkbox
                          {...label}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          defaultChecked={row.favourite}
                          onChange={() =>
                            handleCheckbox(
                              'favourite',
                              !row.favourite,
                              row.id
                            )
                          }
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit Task">
                        <IconButton
                          color="primary"
                          aria-label="Edit"
                          component="label"
                          onClick={() => handleEdit(row)}
                        >
                          <ModeEditOutlineIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Task">
                        <IconButton
                          color="error"
                          aria-label="Delete"
                          component="label"
                          onClick={() => deleteTask(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              {(!data?.length || isLoading) && (
                <TableNoRecordFound loading={isLoading} colSpan={6} />
              )}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
      <AddModule
        addToggle={addToggle}
        setAddToggle={setAddToggle}
        setIsLoading={setIsLoading}
      />
      <EditModule
        editToggle={editToggle}
        setEditToggle={setEditToggle}
        editData={editData}
        setIsLoading={setIsLoading}
      />
      <ConfirmationModal
        delToggle={delToggle}
        setDelToggle={setDelToggle}
        id={deleteId}
        setIsLoading={setIsLoading}
      />
    </>
  );
}
