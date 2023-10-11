import React, { useContext, useEffect, useState } from 'react'
import './EditTask.css'
import Header from '../../Components/Header/Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../Services/baseUrl'
import { AppContext } from '../../AppContext'
function EditTask() {
  const {data}=useContext(AppContext)

  const [tIndex,setTIndex]=useState('')
  const [tTaskDetails,setTTaskDetails]=useState('')
  const [tAssignedDate,setTAssignedDate]=useState('')

  const navigate =useNavigate()
  const [taskname,setTaskname]=useState('')
  const [description,setDescription]=useState('')
  const [deadline,setDeadline]=useState('')
  const [assignedProject,setAssignedProject]=useState('')
  
     useEffect(()=>{
      const id=localStorage.getItem("id")
      // const tname=localStorage.getItem("tname")
      const tname=data.state
      
      axios.post(`${BASE_URL}/user/getEditTask`,{tname,id}).then((res)=>{
        console.log(res);
        console.log("status =",res.status);
        if(res.status==200){
          // success message here
          // navigate('/viewalltasks')
          let {index}=res.data
          setTIndex(index)
          let {taskDetails}=res.data
          setTTaskDetails(taskDetails)
          setTAssignedDate(taskDetails.assignedDate)
          
          // initialise task
          setTaskname(taskDetails.taskname)
          setDescription(taskDetails.description)
          setDeadline(taskDetails.deadline)
          setAssignedProject(taskDetails.assignedProject)
        }
      }).catch(err=>{
        console.log(err);
           // failed message here
      })
    },[])
   


  function handleSubmit(e){
    // let obj={taskname,description,deadline,assignedProject,tAssignedDate:"2023-07-12",id,tIndex}
    e.preventDefault()

    const id=localStorage.getItem("id")
    let obj={taskname:taskname,description:description,deadline:deadline,assignedProject:assignedProject,assignedDate:tAssignedDate,id:id,index:tIndex}
    axios.post(`${BASE_URL}/user/setEditTask`,obj).then((res)=>{
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
  return (
   
    <div>
         <Header />
    <form onSubmit={handleSubmit}>
<div className="registerFrame">
  <div className='registerContainer'>
    <div className="hook">
      <div className="nail"></div>
    </div>
    <h2 className='welcomeTxt'>Edit task</h2>
    {/* <img className='logoIcon' src={logo} alt="logo" /> */}
    <div className="emailContainer">
      <input className='emailInput' type="text" placeholder='Task Name' value={taskname} onChange={(e)=>{setTaskname(e.target.value)}} required />
      <div className='bottomLine'></div>
    </div>
    <div className="emailContainer">
      <input className='emailInput' type="text" placeholder='Description' value={description} onChange={(e)=>{setDescription(e.target.value)}} required />
      <div className='bottomLine'></div>
    </div>
    <div className="emailContainer">
      <input className='emailInput' type="date" placeholder='Deadline' value={deadline}  onChange={(e)=>{setDeadline(e.target.value)}} required />
      <div className='bottomLine'></div>
    </div>
    <div className="emailContainer">
      <input className='emailInput' type="text" placeholder='Assigned project' value={assignedProject}  onChange={(e)=>{setAssignedProject(e.target.value)}} required />
      <div className='bottomLine'></div>
    </div>

    <button className='registerBtn' >Update</button>
    <span className='signUpTxt'>want to see all tasks? <Link className='signUpLink' to='/viewalltasks'>View Task</Link></span>
  </div>
 
</div>
</form>
</div>
  )
}

export default EditTask