import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

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

function Question() {
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
          <Form.Control type='text' placeholder='Duration' />
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
  const [questions, setQuestions] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const numOfQuestions = e.target[0].value;
    if (questions === 0) setQuestions(parseInt(numOfQuestions));
    else {
      console.log('submit');
    }
  };
  return (
    <div className={`${classes.container}`}>
      <h1 className={`${classes.title}`}>Add SubTitle</h1>

      <Form className={`${classes.form}`} onSubmit={handleSubmit}>
        {[...Array(questions)].map((e, i) => {
          return (
            <>
              <h2>Question {i + 1}</h2>
              <Question key={i} />
              <hr />
            </>
          );
        })}
        {questions === 0 && (
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
