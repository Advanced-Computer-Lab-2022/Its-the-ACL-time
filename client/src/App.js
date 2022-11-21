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
import SearchResult from './pages/SearchResult';
import { CourseComponent } from './components/course';
import Certificate from './components/Certificate';
import SubtitlesPage from './pages/SubtitlesPage';
import AlertDialog from './components/AlertDialog';
import ResetPassword from './pages/ResetPassword';
import ForgetPassword from './pages/ForgetPassword';
import SuccessResetPassword from './pages/SuccessResetPassword';
import Test from './components/Test';
import RatingForm from './components/RatingForm';
import Question from './components/Question';
import Exam from './components/Exam';

function App() {
  return (
    <BrowserRouter>
      <CourseProvider>
        <SearchProvider>
          <Routes>
            <Route path='/Admin' element={<Admin />} />
            <Route path='/resetPassword' element={<SuccessResetPassword />} />
            <Route path='/forgetPassword' element={<ForgetPassword />} />
            <Route path='/resetPassword/:token' element={<ResetPassword />} />
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
              {/* <Route
                path='/course/:courseId/subtitle'
                element={<AddSubtitleForm />}
              /> */}

              <Route path='/course/:courseId' element={<CoursePage />} />
              <Route path='/results' element={<SearchResult />} />
              <Route
                path='/course/:courseId/subtitles'
                element={<SubtitlesPage />}
              />
            </Route>
            <Route path='/rating' element={<RatingForm />} />
            <Route path='/filter' element={<Filter />} />
            <Route path='/certificate' element={<Certificate />} />
            <Route path='/dialog' element={<AlertDialog />} />
            <Route path='/test' element={<Test />} />
            <Route path='/question' element={<Question />} />
            <Route path='/exam' element={<Exam />} />
          </Routes>
        </SearchProvider>
      </CourseProvider>
    </BrowserRouter>
  );
}

export default App;
