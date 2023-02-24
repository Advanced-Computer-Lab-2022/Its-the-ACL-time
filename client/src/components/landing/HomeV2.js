import React from 'react';
import './style.css';
import './bootstrap.min.css';
import Content from './Content';
import Courses from './Courses';
import TopCourses from './TopCourses';
import About from './About';
import Service from './Service';
import { useSelector } from 'react-redux';
import Loading from '../Loading';

function HomeV2() {
  const isLoading = useSelector((state) => state.course?.coursesIsLoading);

  return (
    <>
      {isLoading && <Loading></Loading>}
      {!isLoading && (
        <div>
          <Content />
          <Service />
          <About />
          <Courses></Courses>
          <TopCourses />
        </div>
      )}
    </>
  );
}

export default HomeV2;
