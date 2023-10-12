import React, { useContext, useEffect, useState } from 'react'
import './ViewAllTask.css'
import Header from '../../Components/Header/Header'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Services/baseUrl';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { AppContext } from '../../AppContext';
import { ToastContainer } from 'react-toastify';
import { notifyError, notifySuccess } from '../../Components/Toast/Toast';
function ViewAllTask() {
  const {data}=useContext(AppContext)
   

    const navigate=useNavigate()

    const handleCreateTask = () => {
        navigate('/taskmanager')
      }
    const [tasksData,setTaskData]=useState('')
    const [email,setEmail]=useState('')

    const findData=()=>{
        const id=localStorage.getItem('id')
        // console.log(id);
        axios.post(`${BASE_URL}/user/gettask`,{id}).then((res)=>{
          // console.log(res);
          const {tasks}=res.data
          const {email}=res.data
          setTaskData(tasks)
          setEmail(email)
        }).catch(err=>{
          // console.log("error occured ",err);
          notifyError(err)
        })
    }
    useEffect(()=>{
        findData()
    },[])


    const updateStatus=(status,index)=>{
        const id=localStorage.getItem('id')
        // console.log(id);
        axios.post(`${BASE_URL}/user/updateStatus`,{status,id,index}).then((res)=>{
          // console.log(res);
         if(res.status==200){
            findData()
         }
        }).catch(err=>{
          // console.log("error occured ",err);
          notifyError(err)
        })
    }
    const handleInprogress= (index)=>{
        updateStatus("Inprogress",index)
        notifySuccess("Task status inprogress updated! ")
        
    }
    const handleCompleted= (index)=>{
        updateStatus("Completed",index)
        notifySuccess("Task status Completed updated! ")
    }



    const handleEdit= (item)=>{
        // console.log(item);
        // localStorage.setItem("tname",item.taskname)
        data.setState(item.taskname)
        navigate('/editTask')
    }

    const handleDelete= (index)=>{
        const id=localStorage.getItem('id')
        // console.log(id);
        axios.post(`${BASE_URL}/user/deleteTask`,{id,index}).then((res)=>{
          // console.log(res);
          if(res.status==200){
            findData()
          }
        }).catch(err=>{
          // console.log("error occured ",err);
          alert(res.response.data)
        })
        notifySuccess("Task deleted successfully! ")
    }
    return (
        <>

            <Header />
            <h1 className='AllTasksTxt'>All Tasks</h1>
            {/* <div className="sortDropdown"> <Dropdown data-bs-theme="dark">
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          sort
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item  >
            Deadline based
          </Dropdown.Item>
          <Dropdown.Item >Assigned based</Dropdown.Item>
        
        </Dropdown.Menu>
      </Dropdown></div> */}
            {
             

            <Table responsive >
                { tasksData ?
                    <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Deadline</th>
                        <th>Assigned Project</th>
                        <th>Assigned Date</th>
                        <th>Status</th>
                        <th>Control</th>
                    </tr>
                </thead>
                <tbody >
                    { tasksData.map((item,index)=>(
                        <tr key={index}>
                        <td></td>
                        <td>{item.taskname}</td>
                        <td>{item.description}</td>
                        <td>{item.deadline}</td>
                        <td>{item.assignedProject}</td>
                        <td>{item.assignedDate}</td>
                        <td>{item.status}</td>
                        <td > <span className="material-symbols-outlined" style={{paddingRight:"10px",cursor:"pointer"}} onClick={()=>{handleInprogress(index)}}>mystery</span>     
                             <span className="material-symbols-outlined" style={{paddingRight:"10px",cursor:"pointer"}} onClick={()=>{handleCompleted(index)}}>done</span>
                            <span className="material-symbols-outlined" style={{paddingRight:"10px",cursor:"pointer"}} onClick={()=>{handleEdit(item)}}>edit</span>
                            <span className="material-symbols-outlined" style={{cursor:"pointer"}} onClick={()=>{handleDelete(index)}}>delete</span>
                        </td>
                    </tr>
                    ))
                        
                    }
                    

                </tbody>
                </> :
                 <h1 style={{textAlign:"center"}}><span className="material-symbols-outlined">
                 sync
                 </span></h1>
                }
            </Table>
            }
            <div className="createTask">
          <button onClick={handleCreateTask} className='createTaskBtn'>Create Task</button>
          
        </div>
        <ToastContainer />
        </>
    )
}

export default ViewAllTask