import React, { VFC, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { db } from './firebase';
import { UnsubscribeTwoTone } from '@material-ui/icons';
import { FormControl, TextField } from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

const App: VFC = () => {
  const [tasks, setTask] = useState([{ id: '', title: '' }]);
  const [input, setInput] = useState<String>('');

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
    <div className='App'>
      <h1>ToDoApp React/TypeScript</h1>

      <FormControl>
        <TextField
          label='Just Do It'
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
          }}
        />
      </FormControl>

      <button disabled={!input} onClick={NewTask}>
        <AddToPhotosIcon />
      </button>

      {tasks.map((task) => (
        <h3 key={task.id}>{task.title}</h3>
      ))}
    </div>
  );
};

export default App;
