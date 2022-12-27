import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';

import CircularProgress from '@mui/material/CircularProgress';


function Addcomment() {

    const [open, setOpen] = React.useState(false);
  const [comment,setcomment]=useState("");
  const [reportid,setid]=useState("");
  const[opensnake,setopensnake]=useState(false);
  const[message,setmessage]=useState("");
  const[typemessage,settypemessage]=useState("");
  const[progress,setprogress]=useState(true);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  const handleClickOpen = (reportid) => {
setid(reportid);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addcomment =()=>{
    setprogress(true);
  
    // id.preventDefault();
     axios.patch(`http://localhost:8080/api/v1/admin/setcomment`,{reportId:reportid,comment:comment}).then(res=>{
       console.log(res.data);
       setopensnake(true);
       setmessage("comment add sussefully")
       settypemessage("success")
       setprogress(false);
  
  
       setreports((old)=> old.map((report)=>{
        if (report._id==reportid){
          return res.data
        }
        else{
          return report
        }
      
       }));
       console.log(reports);
      })
      .catch(err=>
       {console.log(err)
        setopensnake(true);
        setmessage("report failed")
        settypemessage("error")
      
      }
      );
    }
  
  return (
  <>
     
 
 <Dialog open={open} onClose={handleClose}  fullWidth={'true'} maxWidth={'sm'}>

   <DialogContent>
     <DialogContentText>
     Comment  
     </DialogContentText>
     <div class="mb-3">


</div>
<div className="mb-3">
<label for="exampleFormControlTextarea1" className="form-label">Comment</label>
<textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e)=>{setcomment(e.target.value)}}></textarea>
</div>
   </DialogContent>
   <DialogActions>
     <Button onClick={handleClose}>Cancel</Button>
     <Button onClick={addcomment}>add comment</Button>
   </DialogActions>
 </Dialog>

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

export default Addcomment