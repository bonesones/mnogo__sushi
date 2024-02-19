import { useState } from 'react'
import './index.css'
import React from 'react'
import Home from './pages/home'
import { Routes, Route } from 'react-router-dom'
import Menu from './pages/menu'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Menu />} />
        <Route path='combo' element={<div>test</div>} />
      </Route>
    </Routes>
  )
}

export default App
