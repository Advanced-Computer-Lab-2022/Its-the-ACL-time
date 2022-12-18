import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppContext } from '../context/App/appContext';
import axios from 'axios';


export default function Reportform() {
  const [open, setOpen] = React.useState(false);
  const[type,settype]=useState("");
  const[decsription,setdes]=useState("");
  const {user,token} = useAppContext();



  const handleClickOpen = () => {
    setOpen(true);
  };
  const handlersubmit = async (e) => {

    e.preventDefault();
    await axios.post(
      ` http://localhost:8080/api/v1/user/reportproblem/`, {title:decsription,type:type,course:"635f73a23569cc0d7e43d80e"}, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
       
      }).catch((err) => {
        console.log(err);
      })
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Report
      </Button>
      <Dialog open={open} onClose={handleClose}  fullWidth={'true'} maxWidth={'sm'}>

        <DialogContent>
          <DialogContentText>
          Report 
          </DialogContentText>
          <div class="mb-3">
  <label for="exampleFormControlInput1" className="form-label" >Type of report</label>
  <select className="form-select form-select-sm" aria-label=".form-select-sm example"onChange={(e)=>{settype(e.target.value)}}>
  <option defaultValue>Type of report {type}</option>
  <option value="technical">technical</option>
  <option value="financial">financial</option>
  <option value="other">other</option>
</select>
</div>
<div className="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label">Description</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e)=>{setdes(e.target.value)}}></textarea>
</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlersubmit}>Sumbit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}