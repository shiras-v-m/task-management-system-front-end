import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './Pages/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';  
import Header from './Components/Header/Header'
import Signin from './Pages/Signin/Signin'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './Pages/Signup/Signup'
import Dashboard from './Pages/Dashboard/Dashboard'
import TaskManager from './Pages/TaskManager/TaskManager';
import ViewAllTask from './Pages/ViewAllTasks/ViewAllTask';
import EditTask from './Pages/EditTask/EditTask';
import Footer from './Components/Footer/Footer';
import {AppContext} from './AppContext.js'

function App() {
  const [state,setState]=useState({})
  return (
   <>
   <AppContext.Provider value={{data:{state,setState}}}>
    {/* <Header /> */}
    <Routes>
      {/* <Route path='/' element={<Home/>} /> */}
      <Route path='/signup' element={<Signup/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/' element={<Signin/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/taskmanager' element={<TaskManager/>} />
      <Route path='/viewAllTasks' element={<ViewAllTask/>} />
      <Route path='/editTask' element={<EditTask/>} />
    </Routes>
    <Footer />
    </AppContext.Provider>
   </>
  )
}

export default App
