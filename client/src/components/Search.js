import React, { useState } from 'react';
import { useCourseContext } from '../context/Course/courseContext';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Wrapper from '../assets/Wrappers/SearchWrapper';
import { Link } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const { courses } = useCourseContext();

  const search = () => {
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.subject.toLowerCase().includes(query) ||
        course.createdBy?.username.toLowerCase().includes(query)
    );
  };

  const clearInput = () => {
    setQuery('');
  };

  return (
    <Wrapper>
      <div className='search'>
        <div className='searchInputs'>
          <input
            type='text'
            placeholder='Search for a courses'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <div className='searchIcon'>
            {courses.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id='clearBtn' onClick={clearInput} />
            )}
          </div>
        </div>
        {query !== '' && search().length !== 0 && (
          <div className='dataResult'>
            {search()
              .slice(0, 15)
              .map((value) => {
                return (
                  <Link
                    className='dataItem'
                    to={`/course/${value._id}`}
                    target='_blank'
                    key={value._id}
                  >
                    <p>{value.title} </p>
                  </Link>
                );
              })}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Search;
