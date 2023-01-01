import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../App/appContext';
import currencyConverter from '../../services/CurrencyConverter';

const initialState = {
  courses: [],
  myCourses: [],
};

const countryAbbreviation = {
  Egypt: 'EG',
  'United States': 'USD',
  'United Kingdom': 'GBP',
  Germany: 'EUR',
  France: 'EUR',
  Italy: 'EUR',
  Spain: 'EUR',
  Japan: 'JPY',
  China: 'CNY',
  India: 'INR',
  Brazil: 'BRL',
  Russia: 'RUB',
  Australia: 'AUD',
  Canada: 'CAD',
  Mexico: 'MXN',
  Indonesia: 'IDR',
  Turkey: 'TRY',
  'South Africa': 'ZAR',
  Nigeria: 'NGN',
  'Saudi Arabia': 'SAR',
  'South Korea': 'KRW',
  'United Arab Emirates': 'AED',
  'Hong Kong': 'HKD',
  'Taiwan, Province of China': 'TWD',
  'Singapore, Republic of': 'SGD',
  'Thailand, Kingdom of': 'THB',
  'Philippines, Republic of the': 'PHP',
  'Malaysia, Malaysia': 'MYR',
  'Viet Nam': 'VND',
  'New Zealand': 'NZD',
  'Netherlands, Kingdom of the': 'EUR',
};

const CourseContext = React.createContext();

const CourseProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const { token, user } = useAppContext();

  const formMyCourses = (courses) => {
    let tmpCourses = [];
    courses.forEach((course) => {
      const totalInfo = state.courses.find((c) => c._id === course.courseId);
      tmpCourses.push({ ...course, ...totalInfo });
    });
    return tmpCourses;
  };

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/course');
        const { data } = response;
        const { courses } = data;

        const country = countryAbbreviation[user?.country];
        const convertedCourses = await Promise.all(
          courses.map(async (course) => {
            const { price, currency } = await currencyConverter(
              country,
              course.price
            );
            return { ...course, price, currency };
          })
        );

        setState({
          ...state,
          courses: convertedCourses,
        });
      } catch (error) {
        console.log(error);
      }
    };

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
      } catch (error) {
        console.warn(error);
      }
    };

    if (token && state.courses.length > 0) {
      getMyCourses();
    }
  }, [state.courses, token, user]);

  const createCourse = async (course) => {
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

      setState({
        ...state,
        myCourses: [...state.myCourses, response.data.course],
        courses: [...state.courses, response.data.course],
      });

      return response.data.course._id;
    } catch (error) {
      console.log(error);
    }
  };

  const updateCourse = async (courseId, course, type) => {
    const url = `http://localhost:8080/api/v1/course/${courseId}?type=${type}`;

    try {
      const response = await axios.patch(url, course, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }

    setState({
      ...state,
      myCourses: state.myCourses.map((c) =>
        c._id.toString() === courseId.toString()
          ? {
              ...c,
              ...course,
            }
          : c
      ),
      courses: state.courses.map((c) =>
        c._id.toString() === courseId.toString()
          ? {
              ...c,
              ...course,
            }
          : c
      ),
    });
  };

  const updateCourseProgress = async (courseId, newUpdate) => {
    setState((prevState) => {
      return {
        ...prevState,
        myCourses: [
          ...prevState.myCourses.map((course) =>
            course._id.toString() === courseId.toString()
              ? {
                  ...course,
                  ...newUpdate,
                }
              : course
          ),
        ],
      };
    });

    const user = JSON.parse(localStorage.getItem('user'));
    const courseIndex = user.courses.findIndex(
      (course) => course.courseId.toString() === courseId.toString()
    );
    user.courses[courseIndex] = {
      ...user.courses[courseIndex],
      completedSubtitles: newUpdate.checkedSubtitles,
      completedExams: newUpdate.checkedExams,
      progress: newUpdate.progress,
    };
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <CourseContext.Provider
      value={{
        ...state,
        coursesState: state,
        updateCourseProgress,
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
