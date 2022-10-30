import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CourseForm, CourseGroup } from '../components/course';



export default function Instructor() {
  const [instCourses, setInstCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateCourse,setShowCreateCourse] = useState(false);
  let instId = useParams().instId;
  instId = '6355735013d973de4410cbf7';

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/course/instructor/${instId}`)
      .then((res) => res.json()).then((res) => { console.log(res.data); setInstCourses(res.data); setIsLoading(false) })
      .catch((err) => { setError("failed to load courses"); setIsLoading(false) });
  }, [])
  function addCourseFront(courseData){
    setInstCourses({...instCourses,courseData})
  }
  return (
    <>
      <nav class="m-0 m-md-3 navbar navbar-light bg-light row">
        <div class="container-fluid col">
          <span class="navbar-brand mb-0 h1">Instructor Page</span>
        </div>
        <div class="container-fluid col">
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
        {!showCreateCourse && <button className = "btn btn-outline-primary m-3 col" onClick={()=>setShowCreateCourse(true)}>Add Course</button>}
        {showCreateCourse && <button className = "btn btn-outline-primary m-3 col" onClick={()=>setShowCreateCourse(false)}>Hide Form</button>}
      </nav>
      {showCreateCourse && <CourseForm addCourseFront={addCourseFront} instId={instId}></CourseForm>}
      <div className='container w-100'>
        {isLoading && <div>is loading .......</div>}
        {instCourses && <CourseGroup courses={instCourses} />}
        {error && <div className="text-danger">{error}</div>}
      </div>
    </>
  )
}


