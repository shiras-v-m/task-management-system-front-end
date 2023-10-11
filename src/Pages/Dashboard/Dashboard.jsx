import React, { useContext, useEffect } from 'react'
import './Dashboard.css'
import { useState } from 'react';

import { BASE_URL } from '../../Services/baseUrl';


import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { AppContext } from '../../AppContext';

function Dashboard() {

  // const {data}=useContext(AppContext)

  const [tasksData,setTaskData]=useState('')
  const [email,setEmail]=useState('')
  const [completed,setCompleted]=useState(0)
  const [inProgress,setInProgress]=useState(0)
  const [created,setCreated]=useState(0)

  const findCount= (tasks)=>{
    let InprogressCount=0
    let completedCount=0
    let createdCount=0
    tasks.map((item)=>{
      
      if(item.status==="Inprogress"){
        InprogressCount+=1
      }
      else if(item.status==="Completed"){
        completedCount+=1
      }
      else if(item.status==="created"){
        createdCount+=1
      }
    })
    setInProgress(InprogressCount)
    setCompleted(completedCount)
     
    if(completedCount>0){
      setCompleted(completedCount)
    }
    else{
      setCompleted("0")
    }

    if(createdCount>0){
      setCreated(createdCount)
    }
    else{
      setCreated("0")
    }
  
    if(InprogressCount>0){
      setInProgress(InprogressCount)
    }
    else{
      setInProgress("0")
    }

  }


  useEffect(()=>{
    const id=localStorage.getItem('id')
   
    console.log(id);
    axios.post(`${BASE_URL}/user/gettask`,{id}).then((res)=>{
      console.log(res);
      const {tasks}=res.data
      const {email}=res.data
      setTaskData(tasks)
      setEmail(email)
      findCount(tasks)
 
    }).catch(err=>{
      console.log("error occured ",err);
    })
  },[])

  const navigate=useNavigate()
  


  const handleCreateTask = () => {
    navigate('/taskmanager')
  }
  const handleViewTask = () => {
    navigate('/viewalltasks')
  }
  return (
    <>
     
      <Header />
      <div className="dashboardBody">
        <h2 className='dashboardTxt'>Dashboard</h2>
        <div className="tasks">
          <div className="allTasks task"><h2 className='allTaskTxt'>All tasks</h2>
            <span className="material-symbols-outlined documentIcon">
              file_copy
            </span>
            <h3 className='taskCountTxt'>{`${tasksData ?  tasksData.length : 'Loading'}` }</h3></div>
          <div className="completedTasks task"><h2 className='completedTaskTxt'>Completed Task</h2>
            <span className="material-symbols-outlined documentIcon">
              file_copy
            </span>
            <h3 className='taskCountTxt'>{`${completed ? completed : 'Loading'}` }</h3></div>

            <div className="completedTasks task createTaskTxt"><h2 className='completedTaskTxt '>Created Task</h2>
            <span className="material-symbols-outlined documentIcon">
              file_copy
            </span>
            <h3 className='taskCountTxt'>{`${created ? created : 'Loading'}`}</h3></div>

          <div className="inProgressTasks task"><h2 className='inProgressTaskTxt'>Inprogress Task</h2>
            <span className="material-symbols-outlined documentIcon">
              file_copy
            </span>
            <h3 className='taskCountTxt'>{inProgress}</h3>
            </div>
        </div>

        <div className="createTask">
          <button onClick={handleCreateTask} className='createTaskBtn'>Create Task</button>
          <button onClick={handleViewTask} className='viewTaskBtn'>View Tasks</button>

        </div>
      </div>


    </>
  )
}

export default Dashboard