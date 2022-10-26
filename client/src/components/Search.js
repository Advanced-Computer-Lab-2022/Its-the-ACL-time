import React, { useState } from 'react';
import { useCourseContext } from '../context/Course/courseContext';
import Course from './course/Course';

const Search = () => {
  const [query, setQuery] = useState([]);
  const { courses } = useCourseContext();

  const search = () => {
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.subject.toLowerCase().includes(query)
    );
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        onChange={(e) => setQuery(e.target.value)}
      />
      {search().map((course) => {
        return <h1>{course.title + '   ' + course.subject}</h1>;
      })}
    </div>
  );
};

export default Search;
