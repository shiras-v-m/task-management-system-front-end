import React, { useState } from 'react'
import logo from '../../assets/logo.svg'
import './Signin.css'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'
import Toaster from '../../Components/Toaster/Toaster'
import { BASE_URL } from '../../Services/baseUrl'

function Login() {
  const navigate=useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  function handleSubmit(e){
    e.preventDefault()

    axios.post(`${BASE_URL}/user/login`,{email,password}).then((res)=>{
      console.log(res);
      console.log("status =",res.status);
      const {id,token}=res.data
      if(res.status==200){
        localStorage.setItem("id",id)
        localStorage.setItem("token",token)
        // success message here
        navigate('/dashboard')
      }
    }).catch(err=>{
      console.log(err);
         // failed message here
    })
  }
  console.log(email,password);
  return (
    <form onSubmit={handleSubmit}>
      <div className="loginFrame">
        <div className='loginContainer'>
          <div className="hook">
            <div className="nail"></div>
          </div>
          <h2 className='welcomeTxt'>Signin</h2>
          {/* <img className='logoIcon' src={logo} alt="logo" /> */}
          <div className="emailContainer">
            <input className='emailInput' type="text" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} required/>
            <div className='bottomLine'></div>
          </div>
  
  
  
  
          <div className='passwordContainer' >
            <input className='passwordInput emailInput' type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} required />
            <div className='passwordBottomLine bottomLine'></div>
          </div>
          <button className='loginBtn'>LogIn</button>
          <span className='signUpTxt'>Don’t have an account? <Link className='signUpLink' to='/signup'>Sign Up</Link></span>
        </div>
  
      </div>

    </form>
  )
}

export default Login