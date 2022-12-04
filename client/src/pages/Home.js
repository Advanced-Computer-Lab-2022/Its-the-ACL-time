import React from 'react';
import { Courses,PageHeader, } from '../components';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  main: {
    height: '100%',
    width: '100%',
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <main className={`${classes.main}`}>
      <PageHeader/>
      <Courses />
    </main>
  );
};

export default Home;
