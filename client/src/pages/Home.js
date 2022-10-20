import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { CourseGroup, Course } from '../components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    height: '80vh',
    width: '100%',
  },
}));

const courses = [
  {
    title: 'csen701',
    description: 'new course',
    instructor: 'slim',
  },
  {
    title: 'csen701',
    description: 'new course',
    instructor: 'slim',
  },
  {
    title: 'csen701',
    description: 'new course',
    instructor: 'slim',
  },
];

const Home = () => {
  const classes = useStyles();
  return (
    <main className={`${classes.main}`}>
      <CourseGroup courses={courses} />
    </main>
  );
};

export default Home;
