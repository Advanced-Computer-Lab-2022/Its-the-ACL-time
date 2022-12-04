
import React from 'react'
import { Outlet } from 'react-router-dom';

import SideBar from '../components/admin/SideBar';

const componentName = () => {
 
  
  return (
    <>
    
    <SideBar></SideBar>
    <Outlet></Outlet>
    

    </>
  )
}

export default componentName
