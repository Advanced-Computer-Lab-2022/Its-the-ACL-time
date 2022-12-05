import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {Link} from 'react-router-dom'

function CourseCard({
  courseId,
  courseTitle,
  courseDescription,
  courseInstructor,
  coursePrice,
  courseSubject,
  courseSummary,
  isInstructorCourses,
}) {
  // console.log({ courseTitle, courseDescription, courseInstructor ,coursePrice});

  return (
    <Link to={`/course/${courseId}`} className="text-black text-decoration-none">
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
          {isInstructorCourses && <Link className='btn btn-link' to={`/course/${courseId}/subtitle`} >Add Subtitles</Link> }
          {isInstructorCourses && <Link className='btn btn-link ms-2' to={`/updateCourse/${courseId}`}>Update Course</Link> }
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CourseCard;
