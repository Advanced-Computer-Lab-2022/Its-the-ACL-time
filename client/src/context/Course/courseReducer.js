import {
  CREATE_COURSE,
  GET_COURSES,
  UPDATE_COURSE,
  GET_MY_COURSES,
} from './courseActions';

const courseReducer = (state, action) => {
  switch (action.type) {
    case CREATE_COURSE: {
      return {
        ...state,
        courses: state.courses.push(action.payload.course),
      };
    }

    case GET_COURSES: {
      return {
        ...state,
        courses: action.payload.courses,
      };
    }

    case UPDATE_COURSE: {
      return {
        ...state,
        courses: state.courses.map((course) => {
          if (course._id === action.payload.course._id) {
            return action.payload.course;
          }
          return course;
        }),
      };
    }

    case GET_MY_COURSES: {
      return {
        ...state,
        myCourses: action.payload.courses,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default courseReducer;
