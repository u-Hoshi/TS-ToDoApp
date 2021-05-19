import React, { VFC, useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase';
import { FormControl, TextField, List, makeStyles } from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { Taskitem } from './Taskitem';
import { auth } from './firebase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
  form__wrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  // button: disabled :{
  //   color: "#ccc",
  //   cursor: "none",
  // },
  h1: {
    display: 'inlineBlock',
  },
});

const App: VFC = (props: any) => {
  const [tasks, setTask] = useState([{ id: '', title: '' }]);
  const [input, setInput] = useState<String>('');
  const classes = useStyles();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push('login');
    });
    return () => unSub();
  }, []);

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

  const NewTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection('tasks').add({ title: input });
    setInput('');
  };

  return (
    <div className={classes.app__root}>
      <h1 className={classes.h1}>ToDoApp React/TypeScript</h1>

      <button
        className={classes.app__logout}
        onClick={async () => {
          try {
            await auth.signOut();
            props.history.push('login');
          } catch (error) {
            alert(error.message);
          }
        }}
      >
        <ExitToAppIcon />
      </button>

      <br />
      <div className={classes.form__wrap}>
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
        <button
          className={classes.app__icon}
          disabled={!input}
          onClick={NewTask}
        >
          <AddToPhotosIcon />
        </button>
      </div>

      <List className={classes.list}>
        {tasks.map((task) => (
          <Taskitem
            key={task.id}
            id={task.id}
            title={task.title}
            form__wrap={classes.form__wrap}
          />
        ))}
      </List>
    </div>
  );
};

export default App;
