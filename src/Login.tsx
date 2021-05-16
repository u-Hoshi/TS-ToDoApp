import { makeStyles } from '@material-ui/core';
import React from 'react';

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

export default function Login() {
  return (
    <div>
      <div>Login Component</div>
    </div>
  );
}
