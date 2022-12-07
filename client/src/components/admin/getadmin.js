import React,{useState} from 'react'
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';




const GetAdmin = () => {
  const[username,setusername]=useState("");
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("");
  const[type,settype]=useState("");
  const addhandler =  (e) => {
     e.preventDefault();
    const res = axios.post("http://localhost:8080/api/v1/admin", { username:username,email:email,password:password,type:type });
    console.log(res)
  }

  
  return (
  

    <>
    <div>
    
    <form className='container mb-3 border-2 bg-light shadow-lg'>
    <div class="mb-3 mt-3">
    <label for="username" class="form-label">username:</label>
    <input type="text" class="form-control" onChange={(e)=>{setusername(e.target.value)}} placeholder="Enter username" />
  </div>
  <div class="mb-3 mt-3">
    <label for="email" class="form-label">Email:</label>
    <input type="email" class="form-control" onChange={(e)=>{setemail(e.target.value)}} placeholder="Enter email" name="email"/>
  </div>
  <div class="mb-3 mt-3">
    <label  class="form-label">password:</label>
    <input type="password" class="form-control" onChange={(e)=>{setpassword(e.target.value)}} placeholder="Enter password" />
  </div>
  <div class="mb-3">
    <label class="form-label mb-3">type:</label>
    
      <select calssName='container text-bg-light'  onChange={(e)=>settype(e.target.value)}>

         <option value="">""</option>
         <option value="Admin">Admin</option>
         <option value="Instructor">Instructor</option>
         <option value="Corporate trainee">Corporate trainee</option>


       </select>  </div>
  
  <button type="submit" class=" btn btn-outline-success float-end" onClick={addhandler}> Add</button>
</form> 
    </div>
    


  

  </>
  )
}

export default GetAdmin
