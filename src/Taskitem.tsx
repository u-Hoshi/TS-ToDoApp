import { VFC } from 'react';
import firebase from 'firebase/app';
import { ListItem, TextField, Grid } from '@material-ui/core';
import DeleteOutlineOutLinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

interface Props {
  id: string;
  title: string;
}

export const Taskitem: VFC<Props> = (props) => {
  const { id, title } = props;
  console.log(title);
  return (
    <>
      <ListItem>
        <h2>{title}</h2>
      </ListItem>
    </>
  );
};
