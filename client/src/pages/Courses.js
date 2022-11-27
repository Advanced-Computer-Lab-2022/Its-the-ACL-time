import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Course from '../components/course/Course';
import Filter from '../components/Filter';
import { useCourseContext } from '../context/Course/courseContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '12rem',
  },
  paper: {
    padding: theme.spacing(2),
    margin: '7rem',
    maxWidth: 500,
  },
}));

const state = {
  subject: '',
  minPrice: 0,
  maxPrice: 10000,
  minRating: 0,
  maxRating: 5,
};

export default function Courses() {
  const classes = useStyles();
  const [query, setQuery] = React.useState(state);

  const { courses } = useCourseContext();

  const handleFilter = (e) => {
    const { id, value } = e.target;
    setQuery({ ...query, [id]: value });
    console.log(query);
  };

  return (
    <div className={classes.root}>
      <Filter onFilter={handleFilter} />
      <Paper className={classes.paper}>
        {courses
          .filter((course) => {
            let rating = course.rating / course.numberOfStudent || 4;
            return (
              course.subject
                .toLowerCase()
                .includes(query.subject.toLowerCase()) &&
              course.price >= query.minPrice &&
              course.price <= query.maxPrice &&
              rating >= query.minRating &&
              rating <= query.maxRating
            );
          })
          .map((course) => {
            console.log(course);
            return (
              <Course
                key={course._id}
                title={course.title}
                subject={course.subject}
                description={course.summary}
                instructor={course.createdBy.username}
                price={course.price}
                courseId={course._id}
                numberOfHours={course?.numberOfHours}
                ratings = {course?.ratings}
              />
            );
          })}
      </Paper>
    </div>
  );
}
