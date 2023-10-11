import React, { useState } from 'react'
import './TaskManager.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../../Components/Header/Header'
import { BASE_URL } from '../../Services/baseUrl'
function TaskManager() {
  const navigate =useNavigate()
    const [taskname,setTaskname]=useState('')
    const [description,setDescription]=useState('')
    const [deadline,setDeadline]=useState('')
    const [assignedProject,setAssignedProject]=useState('')


  function handleSubmit(e){
    e.preventDefault()
    alert('submitted')
    const id=localStorage.getItem("id")
    axios.post(`${BASE_URL}/user/addtask`,{taskname,description,deadline,assignedProject,id}).then((res)=>{
      console.log(res);
      console.log("status =",res.status);
      if(res.status==200){
        // success message here
        navigate('/viewalltasks')
      }
    }).catch(err=>{
      console.log(err);
         // failed message here
    })
  }
  console.log(taskname,description,deadline,assignedProject);
  return (
    <>
      <Header />
      <div>
          <form onSubmit={handleSubmit}>
      <div className="registerFrame">
        <div className='registerContainer'>
          <div className="hook">
            <div className="nail"></div>
          </div>
          <h2 className='welcomeTxt'>Add task</h2>
          {/* <img className='logoIcon' src={logo} alt="logo" /> */}
          <div className="emailContainer">
            <input className='emailInput' type="text" placeholder='Task Name' onChange={(e)=>{setTaskname(e.target.value)}} required />
            <div className='bottomLine'></div>
          </div>
          <div className="emailContainer">
            <input className='emailInput' type="text" placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}} required />
            <div className='bottomLine'></div>
          </div>
          <div className="emailContainer">
            <input className='emailInput' type="date" placeholder='Deadline' onChange={(e)=>{setDeadline(e.target.value)}} required />
            <div className='bottomLine'></div>
          </div>
          <div className="emailContainer">
            <input className='emailInput' type="text" placeholder='Assigned project' onChange={(e)=>{setAssignedProject(e.target.value)}} required />
            <div className='bottomLine'></div>
          </div>
    
          <button className='registerBtn'>Submit</button>
          <span className='signUpTxt'>want to see all tasks? <Link className='signUpLink' to='/viewalltasks'>View Task</Link></span>
        </div>
       
      </div>
    </form>
      </div>
    </>
  )
}

export default TaskManager