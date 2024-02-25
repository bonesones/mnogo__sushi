import './index.css'
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from './pages/menu'
import MainPage from './pages/mainPage'

function App() {

  const [category, setCategory] = useState('combo')

  return (
    <Routes>
      <Route path="/" element={<MainPage setCategory={setCategory} />}>
        <Route index element={<Menu category={category} setCategory={setCategory} />} />
      </Route>
    </Routes>
  )
}

export default App
