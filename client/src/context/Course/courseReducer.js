import { CREATE_COURSE, GET_COURSES } from './courseActions';

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

    default:
      return {
        ...state,
      };
  }
};

export default courseReducer;
