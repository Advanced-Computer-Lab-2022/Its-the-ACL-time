
import React from 'react'
import { Outlet } from 'react-router-dom';

import SideBar from '../components/admin/SideBar';
import {Button} from '@mui/material';

const componentName = () => {
 
  
  return (
    <>
    
    <SideBar></SideBar>
    <Button></Button>
    <Outlet></Outlet>
    

    </>
  )
}

export default componentName
