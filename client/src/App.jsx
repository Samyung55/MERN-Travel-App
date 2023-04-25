import "./App.css"
import Home from "./layout/home/Home"
import Navbar from "./layout/navbar/Navbar"
import { Routes, Route, Navigate } from "react-router-dom"
import Footer from "./layout/footer/Footer"
import Signup from "./layout/signup/Signup"
import Login from "./layout/login/Login"
import Type from "./layout/type/Type"
import TypeDetail from "./layout/typeDetail/TypreDetail"
import { useSelector } from 'react-redux'
import Create from "./layout/create/Create"

function App() {
  const { user } = useSelector((state) => state.auth)
  console.log('User:', user)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/create' element={user ? <Create /> : <Navigate to='/login' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path='/types/:type' element={user ? <Type /> : <Navigate to='/login' />} />
        <Route path='/typeDetail/:id' element={user ? <TypeDetail /> : <Navigate to='/login' />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
