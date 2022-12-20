import React from 'react'
import './style.css'
import './bootstrap.min.css'
import Content from './Content'
import Courses from './Courses'
import Topcourses from './Topcourses'
import About from './About'
import Service from './Service'
import Footer from '../Footer'


function HomeV2() {
  return (
    <>
        <div>
       <Content/>
       <Service/>
       <About/>
     <Courses></Courses>
     <Topcourses/>
     <Footer/>

        </div>
    </>
  )
}

export default HomeV2