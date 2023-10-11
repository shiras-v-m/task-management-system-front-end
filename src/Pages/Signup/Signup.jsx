import React, { useState } from 'react'
import './Signup.css'
import logo from '../../assets/logo.svg'
import { Link , useNavigate} from 'react-router-dom'

import axios from 'axios'
function Signup() {
  const navigate =useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [mobile,setMobile]=useState('')
  function handleSubmit(e){
    e.preventDefault()

    axios.post(`${BASE_URL}/user/register`,{email,password,mobile}).then((res)=>{
      console.log(res);
      console.log("status =",res.status);
      if(res.status==200){
        // success message here
        navigate('/signin')
      }
    }).catch(err=>{
      console.log(err);
         // failed message here
    })
  }
  console.log(email,password,confirmPassword,mobile);
  return (
  <form onSubmit={handleSubmit}>
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
  </form>
  )
}

export default Signup