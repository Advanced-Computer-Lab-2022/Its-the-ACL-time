import React, { useContext, useReducer, useEffect } from 'react';
import courseReducer from './courseReducer';
import {
  CREATE_COURSE,
  GET_COURSES,
  UPDATE_COURSE,
  GET_MY_COURSES,
} from './courseActions';
import axios from 'axios';
import { useAppContext } from '../App/appContext';

const initialState = {
  courses: [],
  myCourses: [],
};

const CourseContext = React.createContext();
const CourseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  const { token } = useAppContext();

  useEffect(() => {
    const getAllCourses = async () =>
      axios
        .get('http://localhost:8080/api/v1/course', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          dispatch({
            type: GET_COURSES,
            payload: {
              courses: data.courses,
            },
          });
        })
        .catch((error) => console.log(error));

    const getMyCourses = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/v1/course?myCourses=true',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch({
          type: GET_MY_COURSES,
          payload: {
            courses: response.data.courses,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

    getAllCourses();
    getMyCourses();
  }, [token]);

  const createCourse = async (course) => {
    console.log(course);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/course',
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: CREATE_COURSE,
        payload: { course: response.data.course },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCourse = async (courseId, course) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/course/${courseId}`,
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: UPDATE_COURSE,
        payload: { course: response.data.updatedCourse },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        ...state,
        createCourse,
        updateCourse,
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
