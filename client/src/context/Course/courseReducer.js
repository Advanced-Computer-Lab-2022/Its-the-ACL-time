import { CREATE_COURSE, GET_COURSES, UPDATE_COURSE } from './courseActions';

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

    default:
      return {
        ...state,
      };
  }
};

export default courseReducer;
