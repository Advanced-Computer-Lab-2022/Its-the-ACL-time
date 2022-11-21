import React, { useState } from 'react';
import { useCourseContext } from '../context/Course/courseContext';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Wrapper from '../assets/Wrappers/SearchWrapper';
import { Box } from '@material-ui/core';
// import { useSearchContext } from '../context/Search/searchContext';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  item: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
  },
}));

const Search = () => {
  const { courses } = useCourseContext();
  const classes = useStyles();
  const [state, setState] = useState({
    query: '',
    filteredCourses: [],
  });

  const navigate = useNavigate();
  const dataResult = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/results?query=${e.target.innerText}`);
    dataResult.current.style.display = 'none';
  };

  useEffect(() => {
    let mouseDownHandler = (e) => {
      if (dataResult.current && !dataResult.current.contains(e.target)) {
        dataResult.current.style.display = 'none';
      }
    };
    document.addEventListener('mousedown', mouseDownHandler);

    return () => {
      document.removeEventListener('mousedown', mouseDownHandler);
    };
  }, []);

  const search = (term) => {
    const filteredCourses = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(term.toLowerCase()) ||
        course.subject.toLowerCase().includes(term.toLowerCase()) ||
        course.createdBy?.username.toLowerCase().includes(term.toLowerCase())
    );
    setState({
      query: term,
      filteredCourses,
    });
    // setQueriedCourses(filteredCourses);
  };

  const clearInput = () => {
    setState({
      query: '',
      filteredCourses: [],
    });
  };

  return (
    <Wrapper>
      <div className='search'>
        <div className='searchInputs'>
          <input
            type='text'
            placeholder='Search for a courses'
            value={state.query}
            onChange={(e) => search(e.target.value)}
            onFocus={(e) => {
              if (dataResult.current)
                dataResult.current.style.display =
                  state.filteredCourses.length > 0 ? 'block' : 'none';
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
        {state.query !== '' && state.filteredCourses.length !== 0 && (
          <div className='dataResult' ref={dataResult}>
            {state.filteredCourses.slice(0, 15).map((value) => {
              return (
                <Box
                  className={`${classes.item} dataItem`}
                  onClick={handleClick}
                  key={value._id}
                >
                  <p>{value.title} </p>
                </Box>
              );
            })}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Search;
