import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Service from './Pages/Service'
import Admin from './Pages/Admin'

const App = () => {
  return (
    <div>
    <Routes>
<Route path='/' element={ <Home/>}/>
<Route path='/service/:id' element={ <Service/>}/>
<Route path='/admin' element={ <Admin/>}/>
    </Routes>

      </div>
  )
}

export default App