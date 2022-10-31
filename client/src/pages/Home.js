import React from 'react';
import { Courses } from '../components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    height: '80vh',
    width: '100%',
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <main className={`${classes.main}`}>
      <Courses />
    </main>
  );
};

export default Home;
