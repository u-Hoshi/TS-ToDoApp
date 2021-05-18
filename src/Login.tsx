import {
  FormControl,
  makeStyles,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';

const useStyles = makeStyles({
  login__root: {
    fontFamily: 'serif',
    color: 'dimgray',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '50px',
    '& span': {
      cursor: 'pointer',
    },
  },
});
const Login: React.FC = (props: any) => {
  const classes = useStyles();

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && props.history.push('/');
    });
  }, [props.history]);

  return (
    <div className={classes.login__root}>
      <h1>{isLogin ? 'Login' : 'register'}</h1>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
          name='password'
          label='Password'
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <br />
      <Button
        variant='contained'
        color='primary'
        size='small'
        onClick={
          isLogin
            ? async () => {
                try {
                  await auth.signInWithEmailAndPassword(email, password);
                  props.history.push('/');
                } catch (error) {
                  alert(error.message);
                }
              }
            : async () => {
                try {
                  await auth.createUserWithEmailAndPassword(email, password);
                  props.history.push('/');
                } catch (error) {
                  alert(error.message);
                }
              }
        }
      >
        {isLogin ? 'login' : 'register'}
      </Button>
      <br />
      <Typography>
        <span
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? 'create new account' : 'back to login'}
        </span>
      </Typography>
    </div>
  );
};

export default Login;
