import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/homepage/homenavbar'
import Homepage from './components/homepage/homepage'
import { BrowserRouter } from 'react-router-dom'
import Navigations from './components/navigationstack/navigationstack'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Navigations/>
    
    </BrowserRouter>
     
    </>
  )
}

export default App
