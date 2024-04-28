import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from '../Components/SignUp'
import SignIn from '../Components/SignIn'
import PropertyCreate from '../Components/PropertyCreate'
import Home from "../Components/Home"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter> 
    <Routes>
    <Route path="/" element={<Home/>}/>      
    <Route path="/sign-in" element={<SignIn/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
    <Route path="/create" element={<PropertyCreate/>}/>
    </Routes>
    </BrowserRouter>
      {/* <PropertyCreate /> */}
    </>
  )
}

export default App
