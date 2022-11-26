import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Course from '../components/course/CourseComponent';
import FilterField from '../components/FilterField';
import CustomButton from '../components/CustomButton';
import { FaFilter } from 'react-icons/fa';
import { useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useCourseContext } from '../context/Course/courseContext';
import { useSearchParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

// function to return the number of stars to be displayed
const getStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <FaStar key={i} style={{ color: i < rating ? '#ffc107' : 'grey' }} />
    );
  }
  return stars;
};

const ratingOptions = [
  <>{getStars(5)}</>,
  <>{getStars(4)}</>,
  <>{getStars(3)}</>,
  <>{getStars(2)}</>,
  <>{getStars(1)}</>,
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filters: {
    width: '22rem',
    backgroundColor: '#F2F2F2',
  },

  filterSection: {
    marginTop: '15rem',
    width: '27%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '1rem',
  },
  coursesSection: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '12rem',
    marginRight: '1rem',
  },
  results: {
    marginLeft: 'auto',
    marginRight: '1rem',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#A9A9A9',
  },

  pages: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
  },
}));

function SearchResult() {
  const classes = useStyles();

  const { courses } = useCourseContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = (term) => {
    const filteredCourses = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(term.toLowerCase()) ||
        course.subject.toLowerCase().includes(term.toLowerCase()) ||
        course.createdBy?.username.toLowerCase().includes(term.toLowerCase())
    );
    console.log(filteredCourses);
    return filteredCourses;
  };

  const [state, setState] = useState({
    filterTopics: [],
    filterPrice: [],
    filterRatings: [],
    filteredCourses: [],
  });

  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    setState({
      ...state,
      filteredCourses: searchParams.get('query')
        ? search(searchParams.get('query'))
        : [],
    });
  }, [courses, searchParams]);

  const handleFilter = (filter, field) => {
    switch (field) {
      case 'Topic': {
        setState(() => {
          let topics = state.filterTopics;
          if (state.filterTopics.includes(filter)) {
            topics = state.filterTopics.filter((topic) => topic !== filter);
          } else {
            topics = [...state.filterTopics, filter];
          }

          const filteredCourses = courses.filter((course) => {
            return checkCourse(
              course,
              topics,
              state.filterPrice,
              state.filterRatings
            );
          });

          return {
            ...state,
            filterTopics: topics,
            filteredCourses: filteredCourses,
          };
        });

        break;
      }
      case 'Price': {
        setState(() => {
          let prices = state.filterPrice;
          if (state.filterPrice.includes(filter)) {
            prices = state.filterPrice.filter((price) => price !== filter);
          } else {
            prices = [...state.filterPrice, filter];
          }

          const filteredCourses = courses.filter((course) => {
            return checkCourse(
              course,
              state.filterTopics,
              prices,
              state.filterRatings
            );
          });

          return {
            ...state,
            filterPrice: prices,
            filteredCourses: filteredCourses,
          };
        });

        break;
      }

      case 'Rating': {
        setState(() => {
          let ratings = state.filterRatings;
          if (state.filterRatings.includes(filter)) {
            ratings = state.filterRatings.filter((rating) => rating !== filter);
          } else {
            ratings = [...state.filterRatings, filter];
          }

          const filteredCourses = courses.filter((course) => {
            return checkCourse(
              course,
              state.filterTopics,
              state.filterPrice,
              ratings
            );
          });

          return {
            ...state,
            filterRatings: ratings,
            filteredCourses: filteredCourses,
          };
        });

        break;
      }
      default:
        console.log('default');
    }
  };

  const checkCourse = (candidateCourse, topics, prices, ratings) => {
    console.log(topics.length, prices.length, ratings.length);
    let topicFlag =
      topics.length === 0 || topics.includes(candidateCourse.title)
        ? true
        : false;

    let priceFlag = prices.length === 0;

    prices.forEach((price) => {
      const [min, max] = price.split('-');
      priceFlag =
        priceFlag ||
        (candidateCourse.price >= parseInt(min) &&
          candidateCourse.price <= parseInt(max));
    });

    let ratingFlag = ratings.length === 0;

    ratings.forEach((rating) => {
      ratingFlag = ratingFlag || candidateCourse.rating === parseInt(rating);
    });

    // console.log('Topic: ' + topicFlag);
    // console.log('Price: ' + priceFlag);
    // console.log('Rating: ' + ratingFlag);
    // console.log('-------------------');

    return topicFlag && priceFlag && ratingFlag;
  };

  const getPage = (e) => {
    setPage(e.target.innerText - 1);
  };

  return (
    <div className={classes.root}>
      <section className={`${classes.filterSection}`}>
        <CustomButton
          text='Filter'
          onClick={() => setShowFilters(!showFilters)}
          icon={<FaFilter />}
          className={classes.filterButton}
        ></CustomButton>
        <div className={`${classes.filters}`}>
          {showFilters && (
            <div>
              <FilterField
                title='Topic'
                options={courses.map((course) => course.subject)}
                onFilter={handleFilter}
              />
              <hr className={`${classes.hr}`} />
              <FilterField
                title='Rating'
                options={ratingOptions}
                onFilter={handleFilter}
              />
              <hr />
              <FilterField
                title='Price'
                options={[
                  '0 - 10',
                  '10 - 100',
                  '100 - 1000',
                  '1000 - 10000',
                  '10000+',
                ]}
                onFilter={handleFilter}
              />
            </div>
          )}
        </div>
      </section>
      {state.filteredCourses.length > 0 && (
        <section className={`${classes.coursesSection}`}>
          <p className={`${classes.results}`}>
            {state.filteredCourses.slice(page * 5, (page + 1) * 5).length}{' '}
            results
          </p>
          {state.filteredCourses
            .slice(page * 5, (page + 1) * 5)
            .map((course) => {
              return (
                <Course
                  key={course._id}
                  title={course.title}
                  subject={course.subject}
                  description={course.summary}
                  instructor={course.createdBy.username}
                  price={course.price}
                  courseId={course._id}
                  horizontal={true}
                />
              );
            })}
          <div className={`${classes.pages}`}>
            <Pagination
              count={Math.ceil(state.filteredCourses.length / 5)}
              color='secondary'
              onChange={getPage}
            />
            {/* {[...Array(Math.ceil(state.filteredCourses.length / 5))].map(
            (e, i) => {
              return (
                <p
                  key={`${i}`}
                  onClick={getPage}
                  className={`${classes.pageCircle}`}
                  style={{
                    backgroundColor: i === page ? '#000000' : '#F2F2F2',
                  }}
                >
                  {i + 1}
                </p>
              );
            }
          )} */}
          </div>
        </section>
      )}
    </div>
  );
}

export default SearchResult;
