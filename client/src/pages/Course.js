import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCourseContext } from '../context/Course/courseContext';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  background: {
    width: '100%',
    height: '40vh',
    marginTop: '100px',
    backgroundColor: '#2D3331',
  },
  table: {
    minWidth: 650,
  },
  info: {
    width: '80%',
    height: '100%',
    marginLeft: '5%',
    // backgroundColor: '#F2F2F2',
    color: 'white',
    padding: '4%',
    display: 'flex',
    flexDirection: 'column',
  },
  subtitle: {
    width: '50%',
    height: '40vh',
  },
  title: {
    marginTop: '50px',
  },
}));

const Course = () => {
  const classes = useStyles();
  const { courseId } = useParams();
  const [subtitles, setSubtitles] = useState([]);
  const { courses } = useCourseContext();
  const [course, setCourse] = useState({});

  useEffect(() => {
    function getCourse() {
      const course = courses.find((course) => course._id === courseId);
      console.log(courses);
      setCourse(course);
    }

    async function getSubtitles() {
      const response = await axios.get(
        `http://localhost:8080/api/v1/course/${courseId}/subtitle`
      );
      console.log(response.data.subTitles);
      setSubtitles(response.data.subTitles);
    }
    getCourse();
    getSubtitles();
  }, [courseId, courses]);

  console.log(course);

  return (
    <main className={`${classes.main}`}>
      <div className={`${classes.background}`}>
        <div className={`${classes.info}`}>
          <h1>{course?.title}</h1>
          <h2>{course?.subject}</h2>
          <p>{course?.summary}</p>
          <span>{course?.price}$</span>
        </div>
      </div>
      <h2 className={`${classes.title}`}>Subtitles</h2>
      <div className={`${classes.subtitle}`}>
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='right'>Topic</TableCell>
                  <TableCell align='right'>Link</TableCell>
                  <TableCell align='right'>Summary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subtitles.map((subtitle, idx) => (
                  <TableRow key={idx}>
                    <TableCell align='right'>{subtitle.title}</TableCell>
                    <TableCell align='right'>{subtitle.link}</TableCell>
                    <TableCell align='right'>{subtitle.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
        </div>
      </div>
    </main>
  );
};

export default Course;
