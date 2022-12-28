import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function RefundRequest() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [refundrequest,setrefund]=useState([]);
  const[opensnake,setopensnake]=useState(false);
  const[message,setmessage]=useState("");
  const[typemessage,settypemessage]=useState("");
  const[progress,setprogress]=useState(true);

  useEffect(()=>{
    const state="unseen"
    axios.get(`http://localhost:8080/api/v1/refund`).then(res=>{
    console.log(res.data);
    setrefund(res.data);
    setprogress(false);
   })
   .catch(err=>
    {console.log(err)}
   );
 },[]);
 
  return (
    <>
      <div class="container mt-3">
      <h2>Reports</h2>

<table class="table  table-hover bg-light border border-success ">

    <thead>
      <tr>
        <th>UserName</th>
        <th>Course</th>
        <th>Status</th>
        <th></th>


      </tr>
    </thead>
    <tbody>
      {refundrequest.map(report=>
        <tr>
        <td>{report.user.username }</td>
        <td>{report.course.title}</td>
          <td>{report.status?"money returned":"pending request"}</td>
          <td> {!report.status&& <button type="button" class="btn btn-primary"onClick={()=>{}}>retune money</button>}</td> 
  
        </tr>)
      }
      
    </tbody>
  </table>

</div>
<Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={opensnake}
        onClose={opensnake}
        message={message}
        key={"top" + "center"}
      >
       <Alert onClose={()=> setopensnake(false)} severity={typemessage} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </>
  )
}

export default RefundRequest