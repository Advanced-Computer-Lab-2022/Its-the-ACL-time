import React, { useContext, useReducer, useEffect } from 'react';
import courseReducer from './courseReducer';
import { CREATE_COURSE, GET_COURSES } from './courseActions';
import axios from 'axios';
import { useAppContext } from '../App/appContext';

const initialState = {
  courses: [],
};

const CourseContext = React.createContext();
const CourseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  const { token } = useAppContext();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/course', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: GET_COURSES,
          payload: {
            courses: data.courses,
          },
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <CourseContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

const useCourseContext = () => {
  return useContext(CourseContext);
};

export { useCourseContext, CourseProvider };
