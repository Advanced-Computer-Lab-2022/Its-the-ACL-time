import React from 'react';
import { useCourseContext } from '../context/Course/courseContext';

const Landing = () => {
  const courses = useCourseContext();

  return <div>Landing</div>;
};

export default Landing;
