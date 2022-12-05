import React from 'react';
import * as FaIcons from 'react-icons/fa';
//import * as AiIcons from 'react-icons/ai';
//import * as IoIcons from 'react-icons/io';
import * as IconName from "react-icons/fc";

export const SideBarcontent = [


  {
    title: 'BioGraphy',
    path: '/profile/BioGraphy',
    icon: <FaIcons.FaRegAddressBook />,
    cName: 'nav-text'
  },

  {
    title: 'My Courses',
    path: '/profile/me',
    icon: <FaIcons.FaBookOpen />,
    cName: 'nav-text'
  },

  {
    title: 'Wallet',
    path: '/profile/Wallet',
    icon: <FaIcons.FaRegMoneyBillAlt />,
    cName: 'nav-text'
  },

  {
    title: 'Settings',
    path: '/profile/gg',
    icon: <FaIcons.FaRegSun />,
    cName: 'nav-text'
  },
  {
    title: 'CourseReqest',
    path: '/profile/courserequest',
    icon: <IconName.FcAbout />,
    cName: 'nav-text'
  },
  {
    title: 'Corport trainee',
    path: '/profile/corporatetrinee',
    icon: <IconName.FcGraduationCap />,
    cName: 'nav-text'
  }


];
