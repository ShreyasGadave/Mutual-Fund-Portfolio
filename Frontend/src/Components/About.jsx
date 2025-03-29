import React from 'react'
import Navbar from './Navbar'
import DataAbout from './Data/DataAbout'
import Contact from './Contact'
import Footer from './Footer'

const About = () => {
  return (
    <div id='About'>
<Navbar/>
<DataAbout title="About Me" isAdmin={false} /> 
<Contact/>
<Footer/>

   </div>
  )
}

export default About