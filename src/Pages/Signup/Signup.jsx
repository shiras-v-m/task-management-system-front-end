import React, { useEffect, useState } from 'react'
import './Signup.css'
import logo from '../../assets/logo.svg'
import { Link , useNavigate} from 'react-router-dom'

import axios from 'axios'
import { BASE_URL } from '../../Services/baseUrl'

import  { notifyError, notifySuccess, notifyWarning } from '../../Components/Toast/Toast'
import { ToastContainer } from 'react-toastify'
function Signup() {

  const navigate =useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [mobile,setMobile]=useState('')
  function handleSubmit(e){
    e.preventDefault()
    if(password!=confirmPassword){
     return notifyWarning("Please enter a same password")

    }
    axios.post(`${BASE_URL}/user/register`,{email,password,mobile}).then((res)=>{
      // console.log(res);
      // console.log("status =",res.status);
      if(res.status==200){
        // success message here
        navigate('/signin')
        return notifySuccess(res.data)
      }
    
     
    }).catch(err=>{
      // console.log(err);
      if(err.response.status==401){
        notifyWarning(err.response.data)
        return navigate('/signin')
      }
      notifyError(err.response.data)
         // failed message here
    })
  }
  // console.log(email,password,confirmPassword,mobile);
  return (
  <form onSubmit={handleSubmit}>
          <h3 className='titleTxt'><i className="fa-sharp fa-solid fa-people-roof fa-flip" style={{color:"#ff8000",paddingRight:'10px'}}></i>Task Management System</h3>
    <div className="registerFrame">
      <div className='registerContainer'>
        <div className="hook">
          <div className="nail"></div>
        </div>
        <h2 className='welcomeTxt'>Signup</h2>
        {/* <img className='logoIcon' src={logo} alt="logo" /> */}
        <div className="emailContainer">
          <input className='emailInput' type="text" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} required />
          <div className='bottomLine'></div>
        </div>
  
        <div className='passwordContainer' >
          <input className='passwordInput emailInput' type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} required />
          <div className='passwordBottomLine bottomLine'></div>
        </div>
  
        <div className='passwordContainer' >
          <input className='passwordInput emailInput' type="password" placeholder='Confirm Password' onChange={(e)=>{setConfirmPassword(e.target.value)}} required/>
          <div className='passwordBottomLine bottomLine'></div>
        </div>
  
        <div className='mobileNumberContainer passwordContainer' >
          <input className='emailInput' type="text" placeholder='Mobile Number' onChange={(e)=>{setMobile(e.target.value)}}  required/>
          <div className='passwordBottomLine bottomLine'></div>
        </div>
  
        <button className='registerBtn'>SignUp</button>
        <span className='signUpTxt'>Already have an account? <Link className='signUpLink' to='/signin'>Login</Link></span>
      </div>
     
    </div>
    <ToastContainer />
  </form>
  )
}

export default Signup