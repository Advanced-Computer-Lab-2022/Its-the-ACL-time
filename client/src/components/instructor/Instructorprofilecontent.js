import React from 'react';
import * as FaIcons from 'react-icons/fa';
//import * as AiIcons from 'react-icons/ai';
//import * as IoIcons from 'react-icons/io';
import * as IconName  from "react-icons/fc";

export const SideBarcontent = [
   

    {
        title: 'BioGraphy',
        path: '/InstructorProfile/BioGraphy',
        icon: <FaIcons.FaRegAddressBook />,
        cName: 'nav-text'
      },

      {
        title: 'My Courses',
        path: '/Instructorprofile/mm',
        icon: <FaIcons.FaBookOpen />,
        cName: 'nav-text'
      },
  
  {
    title: 'Wallet',
    path: '/Instructorprofile/Wallet',
    icon: <FaIcons.FaRegMoneyBillAlt />,
    cName: 'nav-text'
  },
  
  {
    title: 'Settings',
    path: '/Instructorprofile/gg',
    icon: <FaIcons.FaRegSun/>,
    cName: 'nav-text'
  },
  {
    title: 'CourseReqest',
    path: '/Instructorprofile/courserequest',
    icon: <IconName.FcAbout/>,
    cName: 'nav-text'
  },
  {
    title: 'Corport trainee',
    path: '/Instructorprofile/corporatetrinee',
    icon: <IconName.FcGraduationCap />,
    cName: 'nav-text'
  }
  
  
];
