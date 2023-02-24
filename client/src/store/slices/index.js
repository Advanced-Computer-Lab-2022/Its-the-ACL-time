import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import courseReducer from './course-slice';
import uiReducer from './ui-slice';
import myCoursesReducer from './myCourses_slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    myCourses: myCoursesReducer,
    ui: uiReducer,
  },
});
export default store;
