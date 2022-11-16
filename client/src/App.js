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
import { NavBar, CourseForm } from './components';
import AddSubtitleForm from './components/subtitle/AddSubtitleForm';
import { CourseProvider } from './context/Course/courseContext';
import { SearchProvider } from './context/Search/searchContext';
import CoursePage from './pages/CoursePage';
import Filter from './components/Filter';
import CustomButton from './components/CustomButton';
import SearchResult from './pages/SearchResult';
import SubTitle from './components/subtitle/SubTitles';
import Review from './components/Review';
import { CourseComponent } from './components/course';
import Certificate from './components/Certificate';

function App() {
  return (
    <BrowserRouter>
      <CourseProvider>
        <SearchProvider>
          <Routes>
            <Route path='/Admin' element={<Admin />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/instructor/:id' element={<Instructor />} />
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
              <Route path='/addCourse' element={<CourseForm />} />
              <Route path='/updateCourse/:courseId' element={<CourseForm />} />
              {/* <Route path='/course/:courseId' element={<CourseForm />} /> */}
              <Route
                path='/course/:courseId/subtitle'
                element={<AddSubtitleForm />}
              />

              <Route path='/course/:courseId' element={<CoursePage />} />
              <Route path='/results' element={<SearchResult />} />
            </Route>
            <Route path='/filter' element={<Filter />} />
            <Route path='/test' element={<CourseComponent />} />
            <Route path='/certificate' element={<Certificate />} />
          </Routes>
        </SearchProvider>
      </CourseProvider>
    </BrowserRouter>
  );
}

export default App;
