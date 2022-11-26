import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCourseContext } from '../context/Course/courseContext';
import SubTitles from '../components/subtitle/SubTitles';
import { Box, Typography } from '@material-ui/core';
import Review from '../components/Review';
import { CourseComponent } from '../components';
import { AiOutlineCheck } from 'react-icons/ai';
import { useAppContext } from '../context/App/appContext';
import { AiFillVideoCamera } from 'react-icons/ai';
import { MdOutlineArticle } from 'react-icons/md';
import { TbCertificate } from 'react-icons/tb';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginTop: '3.9rem',
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
    marginTop: '13rem',
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
  reviewCourse: {
    width: '25rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '55%',
    left: '80%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#dcdad7',
    paddingBottom: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
  },
  reviewVideo: {
    width: '100%',
    height: '15rem',
    borderRadius: '1rem 1rem 0 0',
    backgroundColor: 'black',
  },

  finalPrice: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actualPrice: {
    textDecoration: 'line-through',
    marginRight: '1rem',
  },
  discount: {
    fontWeight: '100',
  },
  discountPrice: {
    color: 'black',
    marginRight: '1rem',
    fontSize: '2rem',
    fontWeight: 'bold',
  },

  addToCart: {
    width: '20rem',
    marginLeft: '2.5rem',
    marginRight: '2.5rem',
    height: '3rem',
    backgroundColor: '#3f51b5',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  coupon: {
    width: '20rem',
    marginLeft: '2.5rem',
    marginRight: '2.5rem',
    height: '3rem',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    marginBottom: '1rem',
    // on hover
    '&:hover': {
      backgroundColor: '#2D3331',
      color: 'white',
    },
  },

  line: {
    width: '90%',
    height: '1px',
    backgroundColor: 'black',
    marginTop: '1rem',
    marginBottom: '1rem',
  },

  applyCoupon: {
    width: '20rem',
    marginLeft: '2.5rem',
    marginRight: '2.5rem',
    marginTop: '1rem',
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#3f51b5',
    alignItems: 'center',
    color: 'white',
  },

  applyCouponInput: {
    border: 'none',
    borderRadius: '0.5rem 0 0 0.5rem',
    fontSize: '1.2rem',
    padding: '0.5rem',
  },

  applyCouponButton: {
    border: 'none',
    borderRadius: '0 0.5rem 0.5rem 0',
    fontSize: '1.2rem',
    padding: '0.5rem',
    backgroundColor: '#2D3331',
    color: 'white',
    cursor: 'pointer',
  },

  courseInclude: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem',
  },

  included: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
  },

  cart: {
    width: '15rem',
    height: '10rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    borderRadius: '0.5rem',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
    '&:hover': {
      backgroundColor: '#dcdad7',
    },
    marginRight: '1rem',
  },

  icon: {
    width: '5rem',
    height: '5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const CoursePage = () => {
  const classes = useStyles();
  const { courseId } = useParams();
  const [subtitles, setSubtitles] = useState([]);
  const { courses } = useCourseContext();
  const [course, setCourse] = useState({});
  const { token } = useAppContext();
  const [showDescription, setShowDescription] = useState(false);
  const [applyCoupon, setApplyCoupon] = useState(false);

  useEffect(() => {
    function getCourse() {
      const course = courses.find((course) => course._id === courseId);
      setCourse(course);
    }

    async function getSubtitles() {
      const response = await axios.get(
        `http://localhost:8080/api/v1/course/${courseId}/subtitle`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.subTitles);
      setSubtitles(response.data.subTitles);
    }
    getCourse();
    getSubtitles();
  }, [courseId, courses]);

  const applyCouponHandler = () => {
    console.log('apply coupon');
  };

  return (
    <main className={`${classes.main}`}>
      <div className={`${classes.background}`}>
        <div className={`${classes.info}`}>
          <h1>{course?.title}</h1>
          <h2>{course?.subject}</h2>
          <p>{course && course?.summary?.slice(0, 50)}</p>
        </div>
        <Box className={`${classes.reviewCourse}`}>
          <div className={`${classes.reviewVideo}`}></div>
          <div className={`${classes.finalPrice}`}>
            <Typography variant='h6' className={`${classes.discountPrice}`}>
              {course?.price || 'discount price'} $
            </Typography>
            <Typography variant='h6' className={`${classes.actualPrice}`}>
              {course?.price - course?.price * (course?.promotion / 100) ||
                'actual price'}{' '}
              $
            </Typography>
            <Typography variant='h6' className={`${classes.discount}`}>
              {course?.promotion || 'promotion'}%
            </Typography>
          </div>
          <button className={`${classes.addToCart}`}>Add To Cart</button>
          <p>
            <AiOutlineCheck /> 30-Day Money-Back Guarantee
          </p>
          <p>
            <AiOutlineCheck />
            Full Lifetime Access
          </p>
          {!applyCoupon && (
            <button
              className={classes.coupon}
              onClick={() => setApplyCoupon(true)}
            >
              Apply Coupon
            </button>
          )}
          {applyCoupon && (
            <>
              <hr className={`${classes.line}`} />
              <div className={`{${classes.applyCoupon}}`}>
                <input
                  type='text'
                  placeholder='Enter Coupon Code'
                  className={`${classes.applyCouponInput}`}
                />
                <button
                  className={classes.applyCouponButton}
                  onClick={applyCouponHandler}
                >
                  Apply
                </button>
              </div>
            </>
          )}
        </Box>
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

        <section className={classes.courseInclude}>
          <h2 className={`${classes.title}`}>This course includes</h2>
          <div className={`${classes.included}`}>
            <Box className={classes.cart}>
              <AiFillVideoCamera className={classes.icon} />
              <p className={classes.comment}> 10 hours on-demand video</p>
            </Box>
            <Box className={classes.cart}>
              <MdOutlineArticle className={classes.icon} />
              <p className={classes.comment}> 10 articles</p>
            </Box>
            <Box className={classes.cart}>
              <TbCertificate className={classes.icon} />
              <p className={classes.comment}> Certificate of Completion</p>
            </Box>
          </div>
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
              {course?.reviews.map((review) => (
                <Review
                  key={review._id}
                  username={review.username}
                  reviewText={review.review}
                  rate={review?.rate}
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
