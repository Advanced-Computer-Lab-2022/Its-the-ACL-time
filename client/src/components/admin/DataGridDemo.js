import * as React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { DataGrid, GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';

import'./background.css'
import Reportform from '../Reportform';

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



export default function DataGridDemo() {
  const[course,setcourse]=useState([])
  const[selectcourse,setselect]=useState([]);
  
 useEffect(()=>{
    
    axios.get("http://localhost:8080/api/v1/admin/courses").then(res=>{
   // console.log(res.data);
    setcourse(res.data);
   })
   .catch(err=>
    {console.log(err)}
   );
   
  
 },[]);
 let rows = [
];
 for(let i=0;i<course.length;i++){
 // console.log(course[i].promotion);
  rows.push({id:course[i]._id,title:course[i].title,subject:course[i].subject,
    price:course[i].price,promotion:course[i].promotion ,
    avatar:course[i].title[0]})

 };
  return (
    
<>
  <Reportform></Reportform>
</>   
  );
}