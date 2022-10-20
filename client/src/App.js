import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing, Register, Login, Home, ProtectedRoute } from './pages';
import { CourseGroup, NavBar } from './components';

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
        <Route path='/course' element={<CourseGroup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
