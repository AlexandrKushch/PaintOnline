import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Canvas from './components/Canvas'
import SettingBar from './components/SettingBar'
import Toolbar from './components/Toolbar'

import './styles/app.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/:id'
          element={
            <div className='app'>
              <Toolbar></Toolbar>
              <SettingBar></SettingBar>
              <Canvas></Canvas>
            </div>
          }
        >
        </Route>

        <Route path='*' element={<Navigate to={(+new Date()).toString(16)} replace='/'></Navigate>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App