import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Landing,
  Register,
  Login,
  Home,
  ProtectedRoute,
  Instructor,
} from './pages';
import Admin from './pages/Admin';
import { NavBar, CourseForm, Courses } from './components';
import AddSubtitleForm from './components/subtitle/AddSubtitleForm';
import Search from './components/Search';
import { CourseProvider } from './context/Course/courseContext';

function App() {
  return (
    <BrowserRouter>
      <CourseProvider>
        <Routes>
          <Route path='/Admin' element={<Admin />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/instructor' element={<Instructor />} />
          <Route element={<NavBar />}>
            <Route path='/landing' element={<Landing />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path='/courses' element={<Courses />} />
          <Route path='/course' element={<CourseForm />} />
          <Route path='/course/:courseId' element={<CourseForm />} />
          <Route path='/search' element={<Search />} />
          <Route
            path='/course/:courseId/subtitle'
            element={<AddSubtitleForm />}
          />
        </Routes>
      </CourseProvider>
    </BrowserRouter>
  );
}

export default App;
