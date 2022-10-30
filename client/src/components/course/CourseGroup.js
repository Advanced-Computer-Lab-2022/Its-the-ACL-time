import React from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import Course from './Course';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  courses: {
    /* full width of the screen and make 30% off from left an right*/
    width: '80vw',
    margin: '10rem 40vw 5rem 5vw',
  },
}));

const CourseGroup = ({ courses }) => {
  const classes = useStyles();
  console.log(courses);
  return (
    <section className={`${classes.courses}`}>
      <h1>Your Courses</h1>
      {/* make the courses scrollable  */}

      <CardGroup overflow='scroll'>
        {courses.map((course) => {
          return (
            <div className='d-flex flex-wrap'>
              <Course
                courseTitle={course.title}
                courseDescription={course.description}
                courseInstructor={course.instructor}
                coursePrice = {course.price}
                courseSubject = {course.subject}
                courseSummary = {course.summary}
                courseNumberOfHours = {course.numberOfHours}
              />
            </div>
          );
        })}
      </CardGroup>
    </section>
  );
};

export default CourseGroup;
