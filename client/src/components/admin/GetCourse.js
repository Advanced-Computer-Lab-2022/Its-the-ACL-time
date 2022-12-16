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
 for(let i=0;i<course.length;i++){
  console.log(course[i].title);
 }
  return (
    <>
      <div className="container mt-3">
      <h2>Courses</h2>
      <div className="input-group mb-3 me-3">
  <span className="input-group-text">promtion</span>
  <input type="text" className="form-control" placeholder="promtion value"/>
  <button type="button" className="btn btn-success">SetPromtion</button>
</div>
 
  <table className="table table-striped table-hover bg-light border border-success ">
    <thead>
      <tr>
      <th>   <input className="form-check-input" type="checkbox" id="check1" value="something" />   </th>
        <th>Title</th>
        <th>Price</th>
        <th>Promtioin</th>
       

      </tr>
    </thead>
    <tbody>
      {course.map(course=>
        <tr>
        <td>   <input className="form-check-input" type="checkbox" id="check1" value="something" /></td>
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