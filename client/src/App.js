import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  SubtitlesPage,
  SuccessResetPassword,
  SearchResult,
  ResetPassword,
  Landing,
  ForgetPassword,
  Login,
  Register,
  CoursePage,
  Home,
  ProtectedRoute,
  Instructor,
  Admin,
  Payment,
  SuccessPayment,
  FailedPayment,
} from './pages';
import { NavBar, CourseForm, Courses } from './components';
import {UserforAdmin,GetCourse,Report,DataGridDemo,CourseRequest} from'./components/admin'

import AddSubtitleForm from './components/subtitle/AddSubtitleForm';
import { CourseProvider } from './context/Course/courseContext';
import { SearchProvider } from './context/Search/searchContext';
import { PaymentProvider } from './context/Payment/payment';
import Filter from './components/Filter';
import { CourseComponent } from './components/course';
import Certificate from './components/Certificate';
import AlertDialog from './components/AlertDialog';
import Test from './components/Test';
import RatingForm from './components/RatingForm';
import Question from './components/Question';
import Exam from './components/Exam';
import LinearProgressBar from './components/LinearProgressBar';
import Footer from './components/Footer';
import Review from './components/Review';
import RatingStars from './components/RatingStars';
import Instructorprofile from './components/instructor/Instructorprofile';
import BioGraphy from './components/instructor/BioGraphy';
import Setting from './components/instructor/Setting';
import ExamForm from './components/ExamForm';
import HomeV2 from './components/homepage/HomeV2';

function App() {
  return (
    <BrowserRouter>
      <PaymentProvider>
        <CourseProvider>
          <SearchProvider>
            <Routes>
            
            <Route path="admin" element={<Admin />}>
            <Route path="" element={<UserforAdmin/>}/>
            <Route path="users" element={<UserforAdmin/>}/>
            <Route path="Report" element={<Report></Report>}/>
            <Route path="courserequest" element={<CourseRequest></CourseRequest>}/>
            <Route path="course" element={<GetCourse></GetCourse>}/>
            <Route path="test" element={<DataGridDemo/>}/>

              </Route>
              <Route path='/resetPassword' element={<SuccessResetPassword />} />
              <Route path='/forgetPassword' element={<ForgetPassword />} />
              <Route path='/resetPassword/:token' element={<ResetPassword />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/SuccessPayment' element={<SuccessPayment />} />
              <Route path='/FailedPayment' element={<SuccessPayment />} />
              <Route path='/profile' element={<Instructorprofile />}>
                <Route path='' element={<Instructor></Instructor>}></Route>
                <Route path='BioGraphy' element={<BioGraphy></BioGraphy>} />
                <Route path='myCourses' element={<Instructor></Instructor>} />
                <Route path='gg' element={<Setting></Setting>} />
              </Route>
              <Route
                element={
                  <>
                    <NavBar />
                  </>
                }
              >
                <Route path='/landing' element={<Landing />} />
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <HomeV2/>
                    </ProtectedRoute>
                  }
                />
                <Route path='/addCourse' element={<CourseForm />} />
                <Route
                  path='/updateCourse/:courseId'
                  element={<CourseForm />}
                />
                <Route
                  path='/course/:courseId/subtitle'
                  element={<AddSubtitleForm />}
                />
                <Route
                  path='/course/:courseId/content'
                  element={<SubtitlesPage />}
                />
                <Route path='/course/:courseId' element={<CoursePage />} />
                <Route
                  path='/course/:courseId/createExam'
                  element={<ExamForm />}
                />

                {/* <Route path='/course/:courseId' element={<CourseForm />} /> */}
                <Route path='/results' element={<SearchResult />} />
              </Route>
              <Route path='/rating' element={<RatingForm />} />
              <Route path='/filter' element={<Filter />} />
              <Route path='/certificate' element={<Certificate />} />
              <Route path='/dialog' element={<AlertDialog />} />
              <Route path='/test' element={<Test />} />
              <Route path='/question' element={<Question />} />
              <Route path='/exam' element={<Exam />} />
              <Route path='/courseComponent' element={<CourseComponent />} />
              <Route path='/progress' element={<LinearProgressBar />} />
              <Route path='/footer' element={<Footer />} />
              <Route path='/review' element={<Review />} />
              <Route path='/rate' element={<RatingStars />} />
            </Routes>
          </SearchProvider>
        </CourseProvider>
      </PaymentProvider>
    </BrowserRouter>
  );
}

/*
          Finished Components
          1- NavBar
          2- footer
          3- courseComponent
          4- review
          5- exam      -> /dialog
          6- question  -> /question
          7- rating     -> /rating
          8- certificate  -> /certificate
          9- /test -> to send a certificate to your email, and download it as pdf
          10- CourseForm (to add course) -> /addCourse
          11- RatingStars -> /rate
*/

export default App;
