import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Nerd academy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
