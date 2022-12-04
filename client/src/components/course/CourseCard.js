import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function CourseCard({
  courseTitle,
  courseDescription,
  courseInstructor,
  coursePrice,
  courseSubject,
  courseSummary,
}) {
  // console.log({ courseTitle, courseDescription, courseInstructor ,coursePrice});

  return (
    <span>
      <Card style={{ width: '20rem', margin: '8px' }}>
        <Card.Img variant='top' src='../Images/course1.png' />
        <Card.Body className="p-2">
          <Card.Title>{courseTitle}</Card.Title>
          <Card.Text>{courseDescription}</Card.Text>
          <ListGroup className='list-group-flush'>
            <ListGroup.Item>{courseInstructor}</ListGroup.Item>
            {coursePrice && <span>price : {coursePrice}</span>}
            {courseSubject && <span>subject : {courseSubject}</span>}
            {courseSummary && <span>summary : {courseSummary.substring(0, 20)}</span>}
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Body>
          <Card.Link href='#'>Card Link</Card.Link>
          <Card.Link href='#'>Another Link</Card.Link>
        </Card.Body>
      </Card>
    </span>
  );
}

export default CourseCard;
