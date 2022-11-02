import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
}));

function SubTitle() {
  return (
    <div>
      <Form.Group className='mb-3' controlId='formGridTitle'>
        <Form.Label>Title</Form.Label>
        <Form.Control placeholder='Title' />
      </Form.Group>

      <Row className='mb-3'>
        <Form.Group as={Col} controlId='formGridLink'>
          <Form.Label>Link</Form.Label>
          <Form.Control type='text' placeholder='Link' />
        </Form.Group>

        <Form.Group as={Col} controlId='formGridDuration'>
          <Form.Label>Duration</Form.Label>
          <Form.Control type='number' placeholder='Duration' />
        </Form.Group>
      </Row>

      <Form.Group className='mb-3' controlId='formGridDescription'>
        <Form.Label>Description</Form.Label>
        <Form.Control as='textarea' placeholder='Description' />
      </Form.Group>
    </div>
  );
}

function AddSubtitleForm() {
  const classes = useStyles();
  const [subtitles, setSubtitles] = useState(0);
  const { courseId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numOfQuestions = e.target[0].value;
    if (subtitles === 0) setSubtitles(parseInt(numOfQuestions));
    else {
      let subTitle = [];
      for (let i = 0; i < subtitles; i++) {
        subTitle[i] = {
          title: e.target[i * 4].value,
          link: e.target[i * 4 + 1].value,
          duration: e.target[i * 4 + 2].value,
          description: e.target[i * 4 + 3].value,
        };
      }

      try {
        const response = await axios.post(
          `http://localhost:8080/api/v1/course/${courseId}/subtitle`,
          subTitle
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className={`${classes.container}`}>
      <h1 className={`${classes.title}`}>Add SubTitle</h1>

      <Form className={`${classes.form}`} onSubmit={handleSubmit}>
        {[...Array(subtitles)].map((e, i) => {
          return (
            <>
              <h2>Subtitle {i + 1}</h2>
              <SubTitle key={'subtitle' + i} />
              <hr />
            </>
          );
        })}
        {subtitles === 0 && (
          <Form.Group className='mb-3' controlId='formGridNumberOfSubtitles'>
            <Form.Label>Number Of Subtitles</Form.Label>
            <Form.Control type='number' placeholder='Number Of Subtitles' />
          </Form.Group>
        )}
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddSubtitleForm;
