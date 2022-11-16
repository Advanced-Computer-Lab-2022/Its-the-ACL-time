import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Course from '../components/course/CourseComponent';
import { useCourseContext } from '../context/Course/courseContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  coursesSection: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '12rem',
    marginRight: '1rem',
  },
  results: {
    marginLeft: 'auto',
    marginRight: '1.3rem',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#A9A9A9',
  },
}));

export default function SearchResult() {
  const classes = useStyles();
  const { courses } = useCourseContext();

  return (
    <div className={classes.root}>
      <section className={`${classes.coursesSection}`}>
        {courses.map((course) => {
          return (
            <Course
              key={course._id}
              title={course.title}
              subject={course.subject}
              description={course.summary}
              instructor={course.createdBy.username}
              price={course.price}
              courseId={course._id}
              horizontal={true}
            />
          );
        })}
      </section>
    </div>
  );
}
