import React from 'react'
import Navbar from '../Components/Common/Navbar'
import DataAbout from '../Components/Data/AboutData'
import Contact from '../Components/Common/Contact'
import Footer from '../Components/Common/Footer'

const About = () => {
  return (
    <div id='About'>
<Navbar/>
<DataAbout title="About Me" isAdmin={false} limit={5} /> 
<Contact/>
<Footer/>

   </div>
  )
}

export default About