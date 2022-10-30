import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Course({ courseTitle, courseDescription, courseInstructor }) {
  console.log({ courseTitle, courseDescription, courseInstructor });
  return (
    <Card style={{ width: '20rem', margin: '8px' }}>
      <Card.Img variant='top' src='../Images/course1.png' />
      <Card.Body>
        <Card.Title>{courseTitle}</Card.Title>
        <Card.Text>{courseDescription}</Card.Text>
      </Card.Body>
      <ListGroup className='list-group-flush'>
        <ListGroup.Item>{courseInstructor}</ListGroup.Item>
        <ListGroup.Item></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href='#'>Card Link</Card.Link>
        <Card.Link href='#'>Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default Course;
