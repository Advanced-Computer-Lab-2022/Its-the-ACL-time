import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/App/appContext';
import { useCourseContext } from '../../context/Course/courseContext';
import { FormControl, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '60vw',
    margin: '7vh 20vw',
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
}));

function CourseForm() {
  const classes = useStyles();

  const { courseId } = useParams();
  const { alert, setAlert, clearAlert, alertText, alertType } = useAppContext();
  const { createCourse, updateCourse } = useCourseContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const title = e.target[0].value;
    const subject = e.target[1].value;
    const price = e.target[2].value;
    const numberOfHours = e.target[3].value;
    const promotion = e.target[4].value;
    const previewLink = e.target[5].value;
    const summary = e.target[6].value;

    const course = {
      title,
      subject,
      price,
      numberOfHours,
      promotion,
      previewLink,
      summary,
    };

    try {
      if (courseId) {
        await updateCourse(courseId, course);
      } else {
        await createCourse(course);
      }
      setAlert(
        'success',
        `Course ${courseId ? 'Updated' : 'Created'} successfully`
      );
      clearAlert();
    } catch (error) {
      console.log('error' + error);
      const { msg } = error.response.data;

      console.log(error.response.data.msg);

      setAlert('error', msg);

      clearAlert();
    }
  };

  //   try {
  //     const response = await axios.request({
  //       baseURL: courseId
  //         ? `http://localhost:8080/api/v1/course/${courseId}`
  //         : 'http://localhost:8080/api/v1/course/',
  //       method: courseId ? 'PATCH' : 'POST',
  //       data: course,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });

  //     console.log(response);

  //     setAlert(
  //       'success',
  //       `Course ${courseId ? 'Updated' : 'Created'} successfully`
  //     );
  //     clearAlert();
  //   } catch (error) {
  //     const { msg } = error.response.data;

  //     console.log(error.response.data.msg);

  //     setAlert('error', msg);

  //     clearAlert();

  //     console.log(error);
  //   }
  // };

  return (
    <div className={`${classes.container}`}>
      <h1 className={`${classes.title}`}>
        {courseId ? 'Update' : 'Add'} Course
      </h1>
      {/* make the alert small */}

      {alert && (
        <Alert variant='filled' severity={alertType} sx={{ width: 20 }}>
          {alertText}
        </Alert>
      )}
      <Form className={`${classes.form}`} onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' placeholder='Enter course title' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridSubject'>
            <FormControl variant='filled' className={classes.formControl}>
              <Form.Label>Subject</Form.Label>

              <Select
                native
                inputProps={{
                  name: 'age',
                  id: 'subject',
                }}
                className={classes.select}
              >
                <option aria-label='None' value='' />
                <option value='Machine Learning'>Machine Learning</option>
                <option value='Deep Learning'>Deep Learning</option>
                <option value='Software Engineering'>
                  Software Engineering
                </option>
                <option value='computer science'>Computer Science</option>
                <option value='Data Science'>Data Science</option>
                <option value='Web Development'>Web Development</option>
                <option value='Artificial Intelligence'>
                  Artificial Intelligence
                </option>
                <option value='Programming'>Programming</option>
                <option value='Mobile Development'>Mobile Development</option>
                <option value='Game Development'>Game Development</option>
                <option value='Cyber Security'>Cyber Security</option>
                <option value='Cloud Computing'>Cloud Computing</option>
                <option value='Blockchain'>Blockchain</option>
                <option value='Internet of Things'>Internet of Things</option>
                <option value='Data Analysis'>Data Analysis</option>
                <option value='Data Visualization'>Data Visualization</option>
                <option value='Data Engineering'>Data Engineering</option>
                <option value='Database Engineering'>
                  Database Engineering
                </option>
              </Select>
            </FormControl>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridPrice'>
            <Form.Label>Price</Form.Label>
            <Form.Control type='number' placeholder='Enter course price' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridNumberOfHours'>
            <Form.Label>Number Of Hours</Form.Label>
            <Form.Control type='number' placeholder='Number Of Hours' />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPromotion'>
            <Form.Label>Promotion</Form.Label>
            <Form.Control type='number' placeholder='Promotion' />
          </Form.Group>
        </Row>
        <Form.Group className='mb-3' controlId='formGridPreviewLink'>
          <Form.Label>Preview Link</Form.Label>
          <Form.Control placeholder='Preview Link' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formGridSummary'>
          <Form.Label>Summary</Form.Label>
          <Form.Control as='textarea' placeholder='Summary' />
        </Form.Group>

        <Button variant='primary' type='submit'>
          {courseId ? 'Update' : 'Add'} Course
        </Button>
      </Form>
    </div>
  );
}

export default CourseForm;
