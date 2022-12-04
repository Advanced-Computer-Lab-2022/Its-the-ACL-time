
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/App/appContext';
function Setting() {
 const [newPassword,setnew]=useState('');
  const [oldPassword,setold]=useState('');
  const { token,user ,dispatch,addToLocalStorage} = useAppContext();
  const[Bio,setbio]=useState(user.biography);

  






  const changehandler =(e)=>{
    axios.patch(
      `http://localhost:8080/api/v1/user/restestpassword/`, {oldPassword:oldPassword,newPassword:newPassword},{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
             .then(res => {
               console.log(res);
               console.log(res.data);
           }).catch((err)=>{
            console.log(err);
           })
  
  };
  console.log(" Bio ",Bio)
  const updatehandler =async (e)=>{
    e.preventDefault();
    await axios.patch(
      `http://localhost:8080/api/v1/user/updateBio/`, {Bio:Bio},{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
             .then(res => {
               console.log(res);
               console.log(res.data);
               user.biography = Bio;
               dispatch({
               type: 'USER_SETUP_SUCCESS',
               payload: {
               token,
               user,
               },
              })
              addToLocalStorage({user,token})
           }).catch((err)=>{
            console.log(err);
           })
  };
        return (
      <>
   

<div class="container mt-3">
  <h2>Change Password</h2>
  <form>
    <div class="row">
      <div class="col-sm-4">
        <lable>old password</lable>
        <input type="text" class="form-control" onChange={(e)=>{setold(e.target.value)}} placeholder="Enter old password" />
      </div>
      <div class="col-sm-4">
      <lable>new password</lable>

        <input type="password" class="form-control" onChange={(e)=>{setnew(e.target.value)}} placeholder="Enter new password" />
      </div>
      <div class="col-sm-1">
        <br/>
      <button type="button" class="btn btn-outline-success" onClick={changehandler}>Submit</button>
     
      </div>
      <label>{newPassword}</label>
    </div>
  </form>
  <hr></hr>
</div>
<div>

<form className='container mt-3'>
<h2>Edit the biography</h2>
    <div class="mb-3 mt-3">
      <label for="comment">Comments:</label>
      <textarea class="form-control" rows="5"  onChange={(e)=>{setbio(e.target.value)}}>{Bio}</textarea>
    </div>
    <button type="submit" class="btn btn-outline-success float-end" onClick={updatehandler} >Submit</button>
  </form>

</div>
       </>
      
    );
  }
  
  export default Setting;