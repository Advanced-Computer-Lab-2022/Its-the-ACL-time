import React, {
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useState,
} from 'react';
import courseReducer from './courseReducer';
import { CREATE_COURSE, GET_COURSES, GET_MY_COURSES } from './courseActions';
import axios from 'axios';
import { useAppContext } from '../App/appContext';

const initialState = {
  courses: [],
  myCourses: [],
};

const CourseContext = React.createContext();
const CourseProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(courseReducer, initialState);
  const [state, setState] = useState(initialState);

  const { token } = useAppContext();

  const formMyCourses = (courses) => {
    let tmpCourses = [];
    courses.forEach((course) => {
      const totalInfo = state.courses.find((c) => c._id === course.courseId);
      tmpCourses.push({ ...course, ...totalInfo });
    });
    return tmpCourses;
  };

  useEffect(() => {
    const getAllCourses = async () =>
      axios
        .get('http://localhost:8080/api/v1/course')
        .then(({ data }) => {
          setState({
            ...state,
            courses: data.courses,
          });
          // dispatch({

          //   type: GET_COURSES,
          //   payload: {
          //     courses: data.courses,
          //   },
          // });
        })
        .catch((error) => console.log(error));

    getAllCourses();
  }, [token]);

  useEffect(() => {
    const getMyCourses = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/v1/course?myCourses=true',
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        setState({
          ...state,
          myCourses: formMyCourses(response.data.courses),
        });

        // dispatch({
        //   type: GET_MY_COURSES,
        //   payload: {
        //     courses: formMyCourses(response.data.courses),
        //   },
        // });
      } catch (error) {
        console.warn(error);
      }
    };

    if (token && state.courses.length > 0) {
      getMyCourses();
    }
  }, [state.courses, token]);

  const createCourse = async (course) => {
    console.log(course);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/course',
        course,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setState({
        ...state,
        myCourses: [...state.myCourses, response.data.course],
        courses: [...state.courses, response.data.course],
      });

      // dispatch({
      //   type: CREATE_COURSE,
      //   payload: {
      //     course: response.data.course,
      //   },
      // });
      return response.data.course._id;
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
            authorization: `Bearer ${token}`,
          },
        }
      );

      setState({
        ...state,
        myCourses: state.myCourses.map((c) =>
          c._id.toString() === courseId.toString()
            ? response.data.updatedCourse
            : c
        ),
        courses: state.courses.map((c) =>
          c._id.toString() === courseId.toString()
            ? response.data.updatedCourse
            : c
        ),
      });

      // dispatch({
      //   type: UPDATE_COURSE,
      //   payload: { course: response.data.updatedCourse },
      // });
      console.log(response.data.updatedCourse);
      return response.data.updatedCourse;
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
