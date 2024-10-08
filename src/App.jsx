import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Inicio from './componentes/Inicio'
import UserContext from '../contexto/UserContext'
import Nav from './componentes/Nav'
import Historial from './componentes/Historial'
import { Toaster } from 'react-hot-toast';

function App() {

  return (

    <UserContext>
      <>
      <div className='main'>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='historial' element={<Historial />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
      </>
    </UserContext>
    
  )
}

export default App
