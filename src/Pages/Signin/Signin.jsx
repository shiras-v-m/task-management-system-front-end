import React, { useContext, useState } from 'react'
import logo from '../../assets/logo.svg'
import './Signin.css'
import axios from 'axios'
import image from '../../assets/bgImage.png'
import { Link, useNavigate } from 'react-router-dom'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BASE_URL } from '../../Services/baseUrl'
import { AppContext } from '../../AppContext'


function Login() {

  // const {data}=useContext(AppContext)

  const notify = (msg) => toast(msg);

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  function handleSubmit(e) {
    e.preventDefault()

    axios.post(`${BASE_URL}/user/login`, { email, password }).then((res) => {
      console.log(res);
      console.log("status =", res.status);
      const { id, token } = res.data
      if (res.status == 200) {
        localStorage.setItem("id", id)
        localStorage.setItem("token", token)
        // success message here
        notify("Logged in successfully")
        navigate('/dashboard')

      }
      else if(res.status == 406){
        alert("Login failed")
      }
      else if(res.status==401){
        alert(res.data)
      }
    }).catch(err => {
      console.log(err);
      // failed message here
    })
  }
  console.log(email, password);
  return (
    <form onSubmit={handleSubmit}>
      {/* <h1>Task Management System</h1> */}
      
   
      <h3 className='titleTxt'><i class="fa-sharp fa-solid fa-people-roof fa-flip" style={{color:"#ff8000",paddingRight:'10px'}}></i>Task Management System</h3>
      <div className="loginFrame">
        <div className='loginContainer'>
          <div className="hook">
            <div className="nail"></div>
          </div>
          <h2 className='welcomeTxt'>Signin</h2>
          {/* <img className='logoIcon' src={logo} alt="logo" /> */}
          <div className="emailContainer">
            <input className='emailInput' type="text" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} required />
            <div className='bottomLine'></div>
          </div>




          <div className='passwordContainer' >
            <input className='passwordInput emailInput' type="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} required />
            <div className='passwordBottomLine bottomLine'></div>
          </div>
          <button className='loginBtn'>LogIn</button>
          <span className='signUpTxt'>Don’t have an account? <Link className='signUpLink' to='/signup'>Sign Up</Link></span>
        </div>

      </div>
      <ToastContainer />
    </form>
  )
}

export default Login