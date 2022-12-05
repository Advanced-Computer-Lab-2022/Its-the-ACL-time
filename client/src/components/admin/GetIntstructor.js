import React,{useState,useEffect} from 'react'
import axios from 'axios';


function GetIntstructor() {
  
  
  const[Instractor,setinst]=useState([])
  
 useEffect(()=>{
    
    axios.get("http://localhost:8080/api/v1/admin/?type=Instructor").then(res=>{
    console.log(res.data);
    setinst(res.data);
   })
   .catch(err=>
    {console.log(err)}
   );
   
  
 },[]);

 
  

  return (

<>
<div class="container mt-3">
  <h2>Instractor</h2>
  <table class="table table-striped table-hover bg-light border border-success ">
    <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      {Instractor.map(user=>
        <tr>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.type}</td>

        </tr>)
      }
      
    </tbody>
  </table>
</div>

</>  
    
  )
}

export default GetIntstructor