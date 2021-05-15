import React, { VFC, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { db } from './firebase';
import { UnsubscribeTwoTone } from '@material-ui/icons';
import { FormControl, TextField, List, makeStyles } from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { Taskitem } from './Taskitem';

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: 'auto',
    width: '80%',
  },
  app__root: {
    textAlign: 'center',
    color: 'dimgray',
    fontFamily: 'serif',
  },
  app__icon: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    marginTop: '30px',
    color: 'dimgray',
  },
  app__logout: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'dimgray',
    marginLeft: '10px',
  },
  // button: disabled :{
  //   color: "#ccc",
  //   cursor: "none",
  // },
  h1: {
    display: 'inlineBlock',
  },
});

const App: VFC = () => {
  const [tasks, setTask] = useState([{ id: '', title: '' }]);
  const [input, setInput] = useState<String>('');
  const classes = useStyles();

  console.log(!input);

  // 初回レンダリング時に取得して画面に描画
  useEffect(() => {
    const unSub = db.collection('tasks').onSnapshot((snapshot) => {
      setTask(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    //  クリーンナップ関数
    return () => unSub();
  }, []);

  const NewTask: VFC = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    db.collection('tasks').add({ title: input });
    setInput('');
  };

  return (
    <div className={classes.app__root}>
      <h1 className={classes.h1}>ToDoApp React/TypeScript</h1>
      <br />

      <FormControl>
        <TextField
          className={classes.field}
          label='Just Do It'
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
          }}
        />
      </FormControl>

      <button className={classes.app__icon} disabled={!input} onClick={NewTask}>
        <AddToPhotosIcon />
      </button>

      <List className={classes.list}>
        {tasks.map((task) => (
          <Taskitem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  );
};

export default App;
