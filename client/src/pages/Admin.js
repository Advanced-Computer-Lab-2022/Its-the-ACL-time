import React, { useEffect, useState } from 'react'



export default function Admin() {
 
  
  return (
    <>

    <div>
      <label for user>Username</label><br></br>
      <input type="text" id="user" size="50"></input><br></br>
      <label for pass>Password</label><br></br>
      <input type="password" id="pass" size="50"></input><br></br>
      <select name="type" id="cars" width="100"><br></br>
      <option value="Instructor">Instructor</option>
      <option value="Coporate trainee">Coporate trainee</option>
      <option value="Adminstrator">Adminstrator</option>
      <button type="button">submit</button>

  </select>
    </div>
     
    </>
  )
}


