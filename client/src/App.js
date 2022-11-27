import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Landing,
  Register,
  Login,
  Home,
  ProtectedRoute,
  Instructor,
  Admin,
  Course,
  Payment,
  SuccessPayment,
  FailedPayment
} from './pages';
import { NavBar, CourseForm, Courses } from './components';
import AddSubtitleForm from './components/subtitle/AddSubtitleForm';
import { CourseProvider } from './context/Course/courseContext';
import { PaymentProvider } from './context/Payment/payment';
function App() {
  return (
    <BrowserRouter>
      <PaymentProvider>
        <CourseProvider>
          <Routes>
            <Route path='/Admin' element={<Admin />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/instructor/:id' element={<Instructor />} />
            <Route path='/Payment' element={<Payment />} />
            <Route path='/SuccessPayment' element={<SuccessPayment />} />
            <Route path='/FailedPayment' element={<FailedPayment />} />
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
              <Route path='/courses' element={<Courses />} />
              <Route path='/course' element={<CourseForm />} />
              {/* <Route path='/course/:courseId' element={<CourseForm />} /> */}
              <Route
                path='/course/:courseId/subtitle'
                element={<AddSubtitleForm />}
              />
              <Route path='/course/:courseId' element={<Course />} />
            </Route>
          </Routes>
        </CourseProvider>
      </PaymentProvider>
    </BrowserRouter>
  );
}

export default App;
