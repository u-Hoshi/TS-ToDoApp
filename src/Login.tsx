import { FormControl, makeStyles, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';

const useStyles = makeStyles({
  login__root: {
    fontFamily: 'serif',
    color: 'dimgray',
    minHeight: 'colum',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
    '& span': {
      cursor: 'pointer',
    },
  },
});

const Login = (props: any) => {
  const classes = useStyles();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && props.history.push('/');
    });
  }, [props.history]);

  return (
    <>
      <h1>{isLogin ? 'Login' : 'register'}</h1>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{ shurink: true }}
          name='email'
          label='E-mail'
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          InputLabelProps={{ shurink: true }}
          name='password'
          label='Password'
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
    </>
  );
};

export default Login;
