import React from 'react'
import Navbar from '../Components/Navbar'
import AdminInfo from '../Components/AdminInfo'
import AdminServices from '../Components/AdminServices'
import AdminNavbar from '../Components/AdminNavbar'

const Admin = () => {
  return (
    <div>
      <Navbar/>
      <AdminNavbar/>
      <AdminInfo/>
    </div>
    

  )
}

export default Admin