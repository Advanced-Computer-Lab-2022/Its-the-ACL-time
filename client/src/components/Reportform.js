import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//import { useAppContext } from '';


export default function Reportform() {
  const [open, setOpen] = React.useState(false);
  const[type,settype]=useState("");
  const[decsription,setdes]=useState("");
//  const {user} = useAppContext();



  const handleClickOpen = () => {
    setOpen(true);
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
  <select class="form-select form-select-sm" aria-label=".form-select-sm example"onChange={(e)=>{settype(e.target.value)}}>
  <option selected>Type of report {type}</option>
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
          <Button onClick={handleClose}>Sumbit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}