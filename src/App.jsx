import { useState } from 'react'
import './index.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from './pages/menu'
import MainPage from './pages/mainPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<Menu />} />
      </Route>
    </Routes>
  )
}

export default App
