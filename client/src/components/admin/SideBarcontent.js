import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as IconName  from "react-icons/fc";

export const SideBarcontent = [
   

  
  {
    title: 'Admins',
    
    path: 'admin',
    icon: <IconName.FcAssistant />,
    cName: 'nav-text'
  },
  {
    title: 'Intstructor',
    path: '/admin/instructor',
    icon: <IconName.FcBusinessman />,
    cName: 'nav-text'
  },
  {
    title: 'Courses',
    path: '/admin/course',
    icon: <IconName.FcStatistics />,
    cName: 'nav-text'
  },
  {
    title: 'reports',
    path: '/admin/Report',
    icon: <IconName.FcSupport />,
    cName: 'nav-text'
  },
  {
    title: 'CourseReqest',
    path: '/admin/courserequest',
    icon: <IconName.FcAbout/>,
    cName: 'nav-text'
  },
  {
    title: 'Corport trainee',
    path: '/admin/corporatetrinee',
    icon: <IconName.FcGraduationCap />,
    cName: 'nav-text'
  }
];
