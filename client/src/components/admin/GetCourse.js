import React,{useState,useEffect} from 'react'
import axios from 'axios';

function GetCourse() {
  const[course,setcourse]=useState([])
  
 useEffect(()=>{
    
    axios.get("http://localhost:8080/api/v1/admin/courses").then(res=>{
    console.log(res.data);
    setcourse(res.data);
   })
   .catch(err=>
    {console.log(err)}
   );
   
  
 },[]);
  return (
    <>
      <div class="container mt-3">
      <h2>Courses</h2>
      <div class="input-group mb-3 me-3">
  <span class="input-group-text">promtion</span>
  <input type="text" class="form-control" placeholder="promtion value"/>
  <button type="button" class="btn btn-success">SetPromtion</button>
</div>
 
  <table class="table table-striped table-hover bg-light border border-success ">
    <thead>
      <tr>
      <th>   <input class="form-check-input" type="checkbox" id="check1" value="something" />   </th>
        <th>Title</th>
        <th>Price</th>
        <th>Promtioin</th>
       

      </tr>
    </thead>
    <tbody>
      {course.map(course=>
        <tr>
        <td>   <input class="form-check-input" type="checkbox" id="check1" value="something" /></td>
          <td>{course.title}</td>
          <td>{course.price}</td>
          <td>{course.promotion}</td>


        </tr>)
      }
      
    </tbody>
  </table>
</div>
    </>
  )
}

export default GetCourse