import React,{VFC,useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {db} from "./firebase"
import { UnsubscribeTwoTone } from '@material-ui/icons';

const App:VFC=() =>{
  const [tasks,setTask] = useState([{id:"",title:""}])

useEffect(()=>{
  const unSub =db.collection("task").onSnapshot((snapshot)=>{
    setTask(
      snapshot.docs.map((doc)=>(
        {id:doc.id,title:doc.data().title}
      ))
    )
  })
  //  クリーンナップ関数
  return ()=>unSub
},[])

  return (
    <div className="App">
    </div>
  )
}

export default App;
