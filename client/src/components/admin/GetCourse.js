import * as React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { DataGrid, GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import'./background.css'

const columns = [
  {
    field: 'avatar',
    headerName: ' ',
    width: 110,
    renderCell: (params) => {
      //console.log(params.value);
      return (
        <>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>{params.value}</Avatar>
           
        </>
      );
    },
    editable: true,
  },
  { field: 'id', headerName: 'ID', width: '90' },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'subject',
    headerName: 'Subject',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'price',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'promotion',
    headerName: 'promotion',
    type: 'number',
    width: 110,
    editable: true,
  },
 
];



export default function GetCourse() {
  const[course,setcourse]=useState([])
  const[selectcourse,setselect]=useState([]);
  const[promotion,setpromtion]=useState(0);
  const [open, setOpen] = React.useState(true);
  let rows = [
  ];
 useEffect(()=>{
    
    axios.get("http://localhost:8080/api/v1/admin/courses").then(res=>{
   // console.log(res.data);
    setcourse(res.data);
    setOpen(false)
    console.log(res.data)
   })
   .catch(err=>
    {console.log(err)}
   );
   
  
 },[]);
 const udatepromotion =(e)=>{
  e.preventDefault();
  setOpen(true);
  // id.preventDefault();
   axios.patch(`http://localhost:8080/api/v1/admin/setpromotion`,{coursesId:selectcourse,promotion:promotion}).then(res=>{
     console.log(res.data);
     setcourse(res.data)
     setOpen(false);


    })
    .catch(err=>
     {console.log(err)
      setOpen(false);}
    
    );
  }

 for(let i=0;i<course.length;i++){
 // console.log(course[i].promotion);
  rows.push({id:course[i]._id,title:course[i].title,subject:course[i].subject,
    price:course[i].price,promotion:course[i].promotion ,
    avatar:course[i].title[0]})

 };
 



  return (
    <div className="container  ms-5">
    <form className="row g-3 m-3">
  
  <div class="col-auto">
    <input type="text" className="form-control" id="inputPassword2" onChange={(e)=>setpromtion(e.target.value)} placeholder=""/>
  </div>
  <div class="col-auto">
    <button type="submit" className="btn btn-primary mb-3" onClick={udatepromotion}>Set Promtion</button>
  </div>
</form>
       <Box sx={{ height: 650, width: '100%'}} >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={rows.length}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
     //   getSelectedRows={(e)=>{console.log(e)}}
     onSelectionModelChange={(newSelection) => {
                   setselect(newSelection)
                   console.log(selectcourse);

                }}
        
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
     <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
   
  );
}