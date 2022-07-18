import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './404'
import PNFMain from './admin/pnf'
import AddEstudiante from './estudiantes/inscribir'
import EstudiantesMain from './estudiantes/listado'
import EstudianteModificar from './estudiantes/modificar'
import Main from './main'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/estudiantes' element={<EstudiantesMain/>} />
        <Route path='/estudiantes/inscribir' element={<AddEstudiante/>} />
        <Route path='/estudiantes/modificar/:id' element={<EstudianteModificar/>} />
        <Route path='/admin/pnf' element={<PNFMain/>} />
        <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default Router