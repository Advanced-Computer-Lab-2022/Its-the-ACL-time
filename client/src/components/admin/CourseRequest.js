import React,{useState,useEffect} from 'react'
import axios from 'axios';
function CourseRequest() {
  const[course,setcourse]=useState([])
  
  useEffect(()=>{
     
     axios.get("http://localhost:8080/api/v1/admin/coursereqeut").then(res=>{
     console.log(res.data);
     setcourse(res.data);
    })
    .catch(err=>
     {console.log(err)}
    );
    
   
  },[]);
   return (
     <>
       <div className="container mt-3">
   <h2>CoursesRequests</h2>
   <table className="table table-striped table-hover bg-light border border-success ">
     <thead>
       <tr>
         <th>Name of Student</th>
         <th>Course</th>
         <th>State</th>
         <th>     </th>
 
       </tr>
     </thead>
     <tbody>
       {course.map(course=>
         <tr>
           <td>{course.user}</td>
           <td>{course.coursename}</td>
           <td>{course.status}</td>
           <td> {<button type="button" className="btn btn-primary">Grant</button>}</td> 
 
 
         </tr>)
       }
       
     </tbody>
   </table>
 </div>
 </>
  )
}

export default CourseRequest