import React from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import Course from './Course';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  courses: {
    /* full width of the screen and make 30% off from left an right*/
    width: '55vw',
    margin: '10rem 40vw 5rem 5vw',
  },
}));

const CourseGroup = ({ courses }) => {
  const classes = useStyles();
  return (
    <section className={`${classes.courses}`}>
      <h1>Your Courses</h1>
      {/* make the courses scrollable  */}

      <CardGroup overflow='scroll'>
        {courses.map((course) => {
          console.log(course.title);
          return (
            <Course
              courseTitle={course.title}
              courseDescription={course.description}
              courseInstructor={course.instructor}
            />
          );
        })}
      </CardGroup>
    </section>
  );
};

export default CourseGroup;
