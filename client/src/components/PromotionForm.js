import React, { useEffect, useRef, useState } from 'react';
import { useCourseContext } from '../context/Course/courseContext';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormControl, Select } from '@material-ui/core';
import SnackBar from './SnackBar';
import { useAppContext } from '../context/App/appContext';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import { updateCourse } from '../store/slices/course-slice';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '60vw',
    margin: '7rem 20rem',
    backgroundColor: '#cccccc',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
  },
  form: {
    padding: '3rem 3rem',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    paddingTop: '2rem',
  },
  select: {
    width: '15rem',
    height: '2.4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '1rem',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: '1px',
    backgroundColor: 'black',
    margin: '1rem 0',
  },
  subtitleTitle: {
    textAlign: 'center',
  },

  alert: {
    display: 'absolute',
    marginTop: '1rem',
  },
  addCourseButton: {
    width: '20rem',
    margin: '.5rem auto',
    display: 'block',
  },
  addSubtitleButton: {
    width: '20rem',
    margin: '.5rem auto',
    display: 'block',
    backgroundColor: '#3f51b5',
  },
  removeSubtitleButton: {
    width: '20rem',
    margin: '.5rem auto',
    display: 'block',
    backgroundColor: '#f44336',
  },

  choice: {
    width: '30rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem 0',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '1rem',
    backgroundColor: '#e0e0e0',
    '&:hover': {
      backgroundColor: '#d5d5d5',
      scale: 1.05,
      transition: 'all 0.5s ease-in-out',
    },
  },

  question: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem 0',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
  },
}));

function PromotionForm({ submitted }) {
  const classes = useStyles();
  const [alert, setAlert] = useState(null);
  const startDateRef = useRef();
  const endDateRef = useRef();
  const promotionPercentageRef = useRef();
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.course.message);
  const type = useSelector((state) => state.course.type);
  const loadingCourses = useSelector((state) => state.course.coursesIsLoading);
  const loadingMyCourses = useSelector(
    (state) => state.course.myCoursesIsLoading
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promotionPercentage = promotionPercentageRef.current.value;
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;
    console.log(promotionPercentage, startDate, endDate);
    if (!startDate || !endDate || !promotionPercentage) {
      setAlert({
        type: 'error',
        message: 'Please fill in all fields',
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      return;
    }

    if (promotionPercentage < 0 || promotionPercentage > 100) {
      setAlert({
        type: 'error',
        message: 'Promotion percentage must be between 0 and 100',
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      return;
    }

    if (startDate > endDate) {
      setAlert({
        type: 'error',
        message: 'Start date must be before end date',
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      return;
    }

    const promotion = {
      promotion: {
        promotionPercentage,
        startDate,
        endDate,
      },
    };
    dispatch(
      updateCourse({
        courseId,
        course: promotion,
        type: 'promotion',
      })
    );
    setTimeout(() => {
      setAlert(null);
      submitted();
    }, 3000);
  };

  return (
    <>
      {alert && (
        <Alert
          className={classes.alert}
          severity={alert?.type}
          style={{
            position: 'fixed',
            top: '10%',
            left: '40%',
          }}
        >
          {alert.message}
        </Alert>
      )}
      <div className={classes.root}>
        <div className={`${classes.container}`}>
          <h1 className={`${classes.title}`}>Add Promotion</h1>
          <Form className={`${classes.form}`} onSubmit={handleSubmit}>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridNumberOfHours'>
                <Form.Label>Promotion Percentage</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter promotion percentage'
                  ref={promotionPercentageRef}
                />
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridPrice'>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type='date'
                  placeholder='Enter course start date'
                  ref={startDateRef}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='formGridNumberOfHours'>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type='date'
                  placeholder='Enter course end date'
                  ref={endDateRef}
                />
              </Form.Group>
            </Row>

            <Button
              variant='primary'
              type='submit'
              className={`${classes.addCourseButton}`}
              id='addCourseButton'
            >
              Add Promotion Code
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default PromotionForm;
