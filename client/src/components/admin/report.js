import React,{useState,useEffect} from 'react'
import axios from 'axios';
function Reports() {
  const[reports,setreports]=useState([]);
  useEffect(()=>{
    
    axios.get(`http://localhost:8080/api/v1/admin/report`).then(res=>{
    console.log(res.data);
    setreports(res.data);
   })
   .catch(err=>
    {console.log(err)}
   );
 },[]);

 const getreport =(state)=>{
  axios.get(`http://localhost:8080/api/v1/admin/report/?status=${state}`).then(res=>{
    console.log(res.data);
    setreports(res.data);
   })
   .catch(err=>
    {console.log(err)}
   );
 }
 const resovle =(id)=>{
 // id.preventDefault();
  axios.patch(`http://localhost:8080/api/v1/admin/reportstate`,{id:id,state:"resolved"}).then(res=>{
    console.log(res.data);
    setreports((old)=> old.filter((report)=>report._id!==id));
   })
   .catch(err=>
    {console.log(err)}
   );
 }
 const pending =(id)=>{
 // id.preventDefault();
  axios.patch(`http://localhost:8080/api/v1/admin/reportstate`,{id:id,state:"pending"}).then(res=>{
    console.log(res.data);
    setreports((old)=> old.filter((report)=>report._id!==id));
   })
   .catch(err=>
    {console.log(err)}
   );
 }



  return (
    <>
      <div class="container mt-3">
      <div class="btn-group">
  <button type="button" class="btn btn-primary" onClick={()=>{getreport('unseen');}}>Unseen</button>
  <button type="button" class="btn btn-primary" onClick={()=>{getreport('pending');}}>Pending</button>
  <button type="button" class="btn btn-primary" onClick={()=>{getreport("resolved");}}>Resolved</button>
</div> 
  <h2>Reports</h2>
  <table class="table  table-hover bg-light border border-success ">
    <thead>
      <tr>
        <th>Title</th>
        <th>Type</th>
        <th>Status</th>
        <th>      </th>
        <th>      </th>


      </tr>
    </thead>
    <tbody>
      {reports.map(report=>
        <tr>
          <td>{report.title}</td>
          <td>{report.type}</td>
          <td>{report.status}</td>
        <td> {report.status==="unseen" && <button type="button" class="btn btn-primary"onClick={()=>{resovle(report._id)}}>resolve</button>}</td> 
        <td> {report.status==="unseen" && <button type="button" class="btn btn-primary"onClick={()=>{pending(report._id)}}>pending</button>}</td> 
          
        </tr>)
      }
      
    </tbody>
  </table>
</div>

    </>
  )
}

export default Reports