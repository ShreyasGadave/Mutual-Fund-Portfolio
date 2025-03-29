import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Service from './Pages/Service'
import AdminServices from './Pages/AdminServices'
import AdminAbout from './Pages/AdminAbout'
import AdminTestimonials from './Pages/AdminTestimonials'
import Error from './Components/Error/Error'
import AdminInfo from './Pages/AdminProfile'
import Admin from './Pages/Admin'
import ProtectedRoute from '../Utils/ProtectedRouter'
import About from './Components/About'


const App = () => {
  return (
    <div>
    <Routes>
<Route path='/' element={ <Home/>}/>
<Route path='/service/:id' element={ <Service/>}/>
<Route path='/admin' element={ <Admin/>}/>
<Route path='/about' element={ <About/>}/>
<Route element={<ProtectedRoute />}> 
<Route path='/admin/profile' element={<AdminInfo/>}/>
<Route path='/admin/about' element={<AdminAbout/>}/>
<Route path='/admin/service' element={<AdminServices/>}/>
<Route path='/admin/testimonials' element={<AdminTestimonials/>}/> </Route>
<Route path='*' element={ <Error/>}/>

    </Routes>

      </div>
  )
}

export default App