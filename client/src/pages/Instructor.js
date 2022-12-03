import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CourseFormInst, CourseCard } from '../components/course';
import CardGroup from 'react-bootstrap/CardGroup';



export default function Instructor() {
  const [instCourses, setInstCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showFilterPrice, setShowFilterPrice] = useState(false);
  const [filteredCourses, setFilterCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useSearchParams({ search: '' });
  const [search, setSearch] = useState(searchQuery.get('search'));
  const [uniqueSubject, setUniqueSubject] = useState([]);
  const [priceFrom, setPriceFrom] = useState(
    Number(searchQuery.get('priceFrom')) || 0
  );
  const [priceTo, setPriceTo] = useState(
    Number(searchQuery.get('priceTo')) || 100000
  );
  console.log(priceFrom);
  console.log(priceTo);

  let instId = useParams().instId;
  instId = '635e894524fe8f2ac3fc4919';

  function handleUnique(data) {
    let unique = ['all'];
    let lookUp = {};
    data.forEach((e) => {
      if (!(e.subject in lookUp)) {
        unique.push(e.subject);
        lookUp[e.subject] = 1;
      }
    });
    setUniqueSubject(unique);
  }

  useEffect(() => {
    // fetch courses add them to the filterCourses and Courses
    // runs only once while first rendering
    fetch(`http://localhost:8080/api/v1/course/instructor/${instId}`)
      .then((res) => res.json())
      .then((res) => {
        setInstCourses((old) => res.data);
        let filteredCourses = res.data.filter(
          (course) =>
            course.title.toLowerCase().startsWith(search) ||
            course.subject.toLowerCase().startsWith(search)
        );
        filteredCourses = filteredCourses.filter(
          (course) => course.price >= priceFrom && course.price <= priceTo
        );
        setFilterCourses(filteredCourses);
        setIsLoading(false);
        handleUnique(res.data);
      })
      .catch((err) => {
        setError('failed to load courses');
        setIsLoading(false);
      });
  }, []);
  function addCourseFront(courseData) {
    instCourses.unshift(courseData);
    setInstCourses([...instCourses]);
    setFilterCourses([...instCourses]);
    setTimeout(() => setShowCreateCourse(false), 3000);
  }
  function filter(filter, subject) {
    filter = filter.toLowerCase();
    let filteredCourses = [];
    console.log(subject);
    if (!subject) {
      filteredCourses = instCourses.filter(
        (course) =>
          course.title.toLowerCase().startsWith(filter) ||
          course.subject.toLowerCase().startsWith(filter)
      );
      console.log(filteredCourses);
    } else {
      if (filter === 'all') {
        filteredCourses = instCourses;
      } else {
        filteredCourses = instCourses.filter(
          (course) => course.subject.toLowerCase() === filter
        );
      }
    }
    filteredCourses = filteredCourses.filter(
      (course) => course.price >= priceFrom && course.price <= priceTo
    );
    setFilterCourses(filteredCourses);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSearchQuery({ search: search });
  }
  function handleSubmitPrice(e) {
    e.preventDefault();
    setSearchQuery({ priceFrom: priceFrom, priceTo: priceTo });
    setSearch('');
    filter('all', true);
  }
  return (
    <>
      <nav className='m-0 m-md-3 navbar navbar-light bg-light row'>
        <div className='container-fluid col'>
          <span className='navbar-brand mb-0 h1'>Instructor Page</span>
        </div>
        <div className='container-fluid col'>
          <form className='d-flex' onSubmit={handleSubmit}>
            <input
              className='form-control me-2'
              name='search'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                filter(e.target.value, false);
              }}
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button className='btn btn-outline-success' type='submit'>
              Search
            </button>
          </form>
        </div>
        {!showCreateCourse && (
          <button
            className='btn btn-outline-primary m-3 col'
            onClick={() => setShowCreateCourse(true)}
          >
            Add Course
          </button>
        )}
        {showCreateCourse && (
          <button
            className='btn btn-outline-primary m-4 col'
            onClick={() => setShowCreateCourse(false)}
          >
            Hide Form{' '}
          </button>
        )}
      </nav>
      {showCreateCourse && (
        <CourseFormInst
          addCourseFront={addCourseFront}
          instId={instId}
        ></CourseFormInst>
      )}
      <div className='container w-100'>
        {isLoading && <div>is loading .......</div>}
        <div className='d-block'>
          {!showFilterPrice && (
            <button
              onClick={() => setShowFilterPrice(true)}
              className='btn btn-outline-primary'
            >
              filter with price
            </button>
          )}
          {showFilterPrice && (
            <button
              onClick={() => setShowFilterPrice(false)}
              className='btn btn-outline-primary'
            >
              hide filter
            </button>
          )}
          {showFilterPrice && (
            <form onSubmit={handleSubmitPrice}>
              <label for='from'>from</label>
              <input
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                id='from'
                type='number'
              ></input>
              <label for='from'>to</label>
              <input
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                id='to'
                type='number'
              ></input>
              <input
                className='btn btn-outline-primary m-2 py-1'
                type='submit'
                value='show courses'
              ></input>
              <button
                className='btn btn-outline-primary m-2 py-1'
                onClick={() => {
                  setPriceFrom(0);
                  setPriceTo(10000);
                }}
              >
                reset
              </button>
            </form>
          )}
        </div>
        {uniqueSubject &&
          uniqueSubject.map((sub) => (
            <button onClick={() => filter(sub, true)} className='btn btn-link'>
              {sub}
            </button>
          ))}
        <section className='container m-2 w-100' style={{
          width: '80vw',
          margin: '1rem 40vw 5rem 5vw'
        }}>
          <h1>Your Courses</h1>
          <div id="carousel" className='d-flex flex-row position-relative'>
            <div className='position-absolute my-auto' style={{ top: "40%", zIndex: 2 }}>
              <button className='rounded rounded-circle bg-dark p-1'>
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
            </div>
            <div className='position-absolute my-auto' style={{ top: "40%", right: "2px", zIndex: 2 }}>
              <button className='rounded rounded-circle bg-dark p-1'>
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
              </button>
            </div>
            {filteredCourses && filteredCourses.map((course) => {
              return (
                <CourseCard
                  courseTitle={course.title}
                  courseDescription={course.description}
                  coursePrice={course.price}
                  courseSubject={course.subject}
                  courseSummary={course.summary}
                />
              );
            })
            }
          </div>
        </section>
        {error && <div className='text-danger'>{error}</div>}
      </div>
    </>
  );
}
