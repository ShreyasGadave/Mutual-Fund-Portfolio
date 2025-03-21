import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Service from './Pages/Service'
import Admin from './Pages/Admin'
import AdminServices from './Components/AdminServices'
import AdminAbout from './Components/AdminAbout'
import AdminTestimonials from './Components/AdminTestimonials'
import Error from './Components/Error'

const App = () => {
  return (
    <div>
    <Routes>
<Route path='/' element={ <Home/>}/>
<Route path='/service/:id' element={ <Service/>}/>
<Route path='/admin' element={ <Admin/>}/>
<Route path='/admin/about' element={<AdminAbout/>}/>
<Route path='/admin/service' element={<AdminServices/>}/>
<Route path='/admin/testimonials' element={<AdminTestimonials/>}/>
<Route path='*' element={ <Error/>}/>

    </Routes>

      </div>
  )
}

export default App