import { VFC, useState } from 'react';
import firebase from 'firebase/app';
import { ListItem, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlineOutLinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { db } from './firebase';

interface Props {
  id: string;
  title: string;
}

const useStyles = makeStyles({
  taskIcon: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    marginLeft: '2px',
    color: 'dimgray',
  },
  h2: {
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
});

export const Taskitem: VFC<Props> = (props) => {
  const { id, title } = props;
  const [newTitle, setNewTitle] = useState(title);
  const classes = useStyles();
  const editTask = () => {
    db.collection('tasks').doc(id).set({ title: newTitle }, { merge: true });
  };
  const deleteTask = () => {
    db.collection('tasks').doc(id).delete();
  };
  return (
    <>
      <ListItem>
        <h2 className={classes.h2}>{title}</h2>
        <Grid container justify='flex-end'>
          <TextField
            InputLabelProps={{ shrink: true }}
            label='Edit task'
            value={newTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewTitle(e.target.value);
            }}
          />
        </Grid>
        <button className={classes.taskIcon} onClick={editTask}>
          <EditOutlinedIcon />
        </button>
        <button className={classes.taskIcon} onClick={deleteTask}>
          <DeleteOutlineOutLinedIcon />
        </button>
      </ListItem>
    </>
  );
};
