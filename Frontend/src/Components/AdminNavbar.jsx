import React from 'react'
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (  

    <div className='m-5 flex flex-row gap-3 md:gap-2 sm:gap-1 overflow-scroll scrollbar-hide'>
      <NavLink to='/admin/'> <div className="inline-flex border border-gray-500 items-center rounded-md bg-gray-50 px-4 py-1 text-base  cursor-pointer font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset hover:bg-blue-400 hover:text-white">
        Profile
      </div></NavLink>
      <NavLink to='/admin/about'> <div className="inline-flex border border-gray-500  items-center rounded-md bg-gray-50 px-4 py-1 text-base cursor-pointer font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset  hover:bg-blue-400 hover:text-white">
        About
      </div></NavLink>
     
     <NavLink to='/admin/Service'> <div className="inline-flex border border-gray-500  items-center rounded-md bg-gray-50 px-4 py-1 text-base cursor-pointer font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset  hover:bg-blue-400 hover:text-white">
       Service
      </div></NavLink>
     
     <NavLink to='/admin/Testimonials'> <div className="inline-flex border border-gray-500  items-center rounded-md bg-gray-50 px-4 py-1 text-base cursor-pointer font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset  hover:bg-blue-400 hover:text-white">
      Testimonials
      </div></NavLink>
     
    </div>
  )
}

export default AdminNavbar