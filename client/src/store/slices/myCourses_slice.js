import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMyCourses = createAsyncThunk(
  'course/getMyCourses',
  async (token, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const response = await axios.get(
        'http://localhost:8080/api/v1/course?myCourses=true',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const progressInfo = getState().auth.user.courses;
      const courses = response.data.courses;
      courses.forEach((course) => {
        const courseProgress = progressInfo.find(
          (progress) => progress.courseId === course._id
        );
        course.courseProgress = {
          ...course.courseProgress,
          ...courseProgress,
        };
      });
      console.log(courses);
      return courses;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProgress = createAsyncThunk(
  'course/updateProgress',
  async (content, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    const { courseId, completedSubtitles, completedExams, progress } = content;
    const updatedProgress = {
      completedSubtitles,
      completedExams,
      progress,
    };
    console.log(updatedProgress);
    try {
      await axios.patch(
        `http://localhost:8080/api/v1/user/progress/${courseId}`,
        {
          ...updatedProgress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = localStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      const userCourses = parsedUser.courses;
      const userCourseIndex = userCourses.findIndex(
        (course) => course.courseId === courseId
      );
      userCourses[userCourseIndex] = {
        ...userCourses[userCourseIndex],
        ...updatedProgress,
      };
      parsedUser.courses = userCourses;
      localStorage.setItem('user', JSON.stringify(parsedUser));

      return {
        courseId,
        updatedProgress,
      };
    } catch (error) {
      const msg = error.response.data?.message || error.response.data?.msg;
      return rejectWithValue(msg);
    }
  }
);

const courseSlice = createSlice({
  name: 'myCourses',
  initialState: {
    myCourses: [],
    myCoursesIsLoading: false,
    error: null,
  },

  reducers: {
    updateMyCourse: (state, action) => {
      const { courseId, course } = action.payload;
      const courseIndex = state.myCourses.findIndex(
        (course) => course._id === courseId
      );
      state.myCourses[courseIndex] = {
        ...state.myCourses[courseIndex],
        ...course,
      };
    },
  },
  extraReducers: {
    [getMyCourses.pending]: (state, action) => {
      state.myCoursesIsLoading = true;
      state.error = null;
    },
    [getMyCourses.fulfilled]: (state, action) => {
      state.myCourses = action.payload;
      state.myCoursesIsLoading = false;
    },
    [getMyCourses.rejected]: (state, action) => {
      state.myCoursesIsLoading = false;
      state.error = action.payload;
    },

    [updateProgress.pending]: (state, action) => {
      state.myCoursesIsLoading = true;
      state.error = null;
    },

    [updateProgress.fulfilled]: (state, action) => {
      const { courseId, updatedProgress } = action.payload;
      const courseIndex = state.myCourses.findIndex(
        (course) => course._id === courseId
      );
      state.myCourses[courseIndex] = {
        ...state.myCourses[courseIndex],
        courseProgress: {
          ...state.myCourses[courseIndex].courseProgress,
          ...updatedProgress,
        },
      };
      state.myCoursesIsLoading = false;
    },

    [updateProgress.rejected]: (state, action) => {
      state.myCoursesIsLoading = false;
      state.error = action.payload;
    },
  },
});

export default courseSlice.reducer;
export const { updateMyCourse } = courseSlice.actions;
