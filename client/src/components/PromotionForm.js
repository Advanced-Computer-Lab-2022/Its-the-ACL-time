import React, { useRef, useState } from 'react';
import { useCourseContext } from '../context/Course/courseContext';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/App/appContext';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormControl, Select } from '@material-ui/core';

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

function PromotionForm() {
  const classes = useStyles();
  const { myCourses } = useCourseContext();
  const { courseId } = useParams();
  const { alert, setAlert, clearAlert, alertText, alertType } = useAppContext();
  console.log(myCourses);

  const handleSubmit = async (e) => {};

  return (
    <div className={`${classes.container}`}>
      <h1 className={`${classes.title}`}>Promotion Code</h1>

      {alert && (
        <Alert variant='filled' severity={alertType} sx={{ width: 20 }}>
          {alertText}
        </Alert>
      )}
      <Form className={`${classes.form}`} onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridTitle'>
            <Form.Label>Promotion Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter course promotion code'
            />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridSubject'>
            <FormControl variant='filled' className={classes.formControl}>
              <Form.Label>Course</Form.Label>

              <Select
                native
                inputProps={{
                  name: 'age',
                  id: 'subject',
                }}
                className={classes.select}
              >
                <option aria-label='None' value='' />
                {myCourses.map((course, i) => (
                  <option value={course._id} key={course._id}>
                    {course.title}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridPrice'>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type='date' placeholder='Enter course start date' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridNumberOfHours'>
            <Form.Label>End Date</Form.Label>
            {/* make the type of the form.control date */}
            <Form.Control type='date' placeholder='Enter course end date' />
          </Form.Group>
        </Row>

        <Button
          variant='primary'
          type='submit'
          className={`${classes.addCourseButton}`}
          id='addCourseButton'
          disabled={!courseId}
        >
          Add Promotion Code
        </Button>
      </Form>
    </div>
  );
}

export default PromotionForm;
