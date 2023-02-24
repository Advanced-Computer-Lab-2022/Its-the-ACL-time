import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1/course' }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => '/',
    }),

    getMyCourses: builder.query({
      query: () => {
        return {
          url: '?myCourses=true',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
      },
    }),

    getCourse: builder.query({
      query: (id) => `/${id}`,
    }),
    addCourse: builder.mutation({
      query: (course) => ({
        url: '/',
        method: 'POST',
        body: course,
      }),
    }),
    updateCourse: builder.mutation({
      query: (course) => ({
        url: `/${course.id}`,
        method: 'PUT',
        body: course,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetMyCoursesQuery,
  useGetCourseQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
