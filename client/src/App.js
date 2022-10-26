import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing, Register, Login, Home, ProtectedRoute } from './pages';
import { CourseGroup, NavBar, CourseForm } from './components';
import AddSubtitleForm from './components/subtitle/AddSubtitleForm';
import Search from './components/Search';
import { CourseProvider } from './context/Course/courseContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
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
        <Route path='/courses' element={<CourseGroup />} />
        <Route path='/course' element={<CourseForm />} />
        <Route path='/course/:courseId' element={<CourseForm />} />
        <Route
          path='/search'
          element={
            <CourseProvider>
              <Search />
            </CourseProvider>
          }
        />
        <Route
          path='/course/:courseId/subtitle'
          element={<AddSubtitleForm />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
