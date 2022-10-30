import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CourseGroup } from '../components/course';
import ReactStars from 'react-rating-stars-component';


export default function Instructor() {
  const [instCourses, setInstCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)
  let instId = useParams().instId;
  instId = '6355735013d973de4410cbf7';

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/course/instructor/${instId}`)
      .then((res) => res.json()).then((res) => { console.log(res.data); setInstCourses(res.data); setIsLoading(false) })
      .catch((err) => { setError("failed to load courses"); setIsLoading(false) });
  }, [])
  console.log(instCourses);

  return (
    <>
      <div>Instructor page</div>
      <div className='container w-100'>
        {isLoading && <div>is loading .......</div>}
        {instCourses && < CourseGroup courses={instCourses} />}
        {error && <div className="text-danger">{error}</div>}
      </div>
    </>
  )
}


