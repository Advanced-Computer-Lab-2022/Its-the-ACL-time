import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCourseContext } from '../context/Course/courseContext';
import SubTitles from '../components/subtitle/SubTitles';
import { Box } from '@material-ui/core';
import Review from '../components/Review';
import { CourseComponent } from '../components';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginTop: '4.2rem',
  },
  background: {
    width: '100%',
    backgroundColor: '#2D3331',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
  },
  info: {
    width: '80%',
    height: '100%',
    marginLeft: '5%',
    color: 'white',
    padding: '4%',
    display: 'flex',
    flexDirection: 'column',
  },
  subtitle: {
    marginLeft: '5rem',
    width: '75%',
    display: 'absolute',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px',
  },
  description: {
    marginLeft: '8rem',
    marginRight: '10rem',
  },
  content: {
    marginLeft: '5rem',
    marginRight: '5rem',
    marginTop: '5rem',
  },
  showMore: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#3f51b5',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  Items: {
    overflow: 'auto',
  },
}));

const CoursePage = () => {
  const classes = useStyles();
  const { courseId } = useParams();
  const [subtitles, setSubtitles] = useState([]);
  const { courses } = useCourseContext();
  const [course, setCourse] = useState({});
  const [showDescription, setShowDescription] = useState(false);

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
          <p>{course && course?.summary?.slice(0, 50)}</p>
          <span>{course?.price}$</span>
        </div>
        {/* frame for youtube video here  */}
        {/* <iframe
          width='560'
          height='315'
          src='https://www.youtube.com/embed/QPzmsQ86_HM'
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen
        ></iframe> */}
      </div>
      <div className={`${classes.content}`}>
        <section className={`${classes.description}`}>
          <h2 className={`${classes.title}`}>Description</h2>
          {course?.summary && (
            <Box>
              {course?.summary.slice(
                0,
                showDescription ? course?.summary.length : 300
              )}
              {course?.summary.length > 300 && (
                <p>
                  <button
                    className={`${classes.showMore}`}
                    onClick={() => setShowDescription(!showDescription)}
                  >
                    {showDescription ? 'Show less' : 'Show more'}
                  </button>
                </p>
              )}
            </Box>
          )}
        </section>

        <section>
          <h2 className={`${classes.title}`}>Content</h2>
          <div className={`${classes.subtitle}`}>
            <SubTitles data={subtitles} />
            <br />
            <br />
          </div>
        </section>

        <section>
          <h2 className={`${classes.title}`}>Reviews</h2>
          {course && course?.reviews && (
            <Box
              display='flex'
              flexDirection='row'
              className={`${classes.Items}`}
            >
              {course.reviews.map((review) => (
                <Review
                  key={review._id}
                  username={review.username}
                  reviewText={review.review}
                />
              ))}
            </Box>
          )}
          <br />
        </section>

        <section>
          <h2 className={`${classes.title}`}>Suggested Courses</h2>
          {courses && (
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='center'
              className={`${classes.Items}`}
            >
              {courses.map(
                (item) =>
                  course &&
                  course.subject === item.subject && (
                    <CourseComponent
                      key={item._id}
                      title={item.title}
                      subject={item.subject}
                      description={item.summary}
                      instructor={item.createdBy.username}
                      price={item.price}
                      courseId={item._id}
                      horizontal={false}
                    />
                  )
              )}
            </Box>
          )}
        </section>
        <br />
        <br />
      </div>
    </main>
  );
};

export default CoursePage;
