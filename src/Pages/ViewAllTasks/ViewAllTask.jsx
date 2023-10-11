import React, { useEffect, useState } from 'react'
import './ViewAllTask.css'
import Header from '../../Components/Header/Header'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Services/baseUrl';
function ViewAllTask() {

   

    const navigate=useNavigate()

    const handleCreateTask = () => {
        navigate('/taskmanager')
      }
    const [tasksData,setTaskData]=useState('')
    const [email,setEmail]=useState('')

    const findData=()=>{
        const id=localStorage.getItem('id')
        console.log(id);
        axios.post(`${BASE_URL}/user/gettask`,{id}).then((res)=>{
          console.log(res);
          const {tasks}=res.data
          const {email}=res.data
          setTaskData(tasks)
          setEmail(email)
        }).catch(err=>{
          console.log("error occured ",err);
        })
    }
    useEffect(()=>{
        findData()
    },[])


    const updateStatus=(status,index)=>{
        const id=localStorage.getItem('id')
        console.log(id);
        axios.post(`${BASE_URL}/user/updateStatus`,{status,id,index}).then((res)=>{
          console.log(res);
         if(res.status==200){
            findData()
         }
        }).catch(err=>{
          console.log("error occured ",err);
        })
    }
    const handleInprogress= (index)=>{
        updateStatus("Inprogress",index)
    }
    const handleCompleted= (index)=>{
        updateStatus("Completed",index)
    }



    const handleEdit= (item)=>{
        console.log(item);
        localStorage.setItem("tname",item.taskname)
        navigate('/editTask')
    }

    const handleDelete= (index)=>{
        const id=localStorage.getItem('id')
        console.log(id);
        axios.post(`${BASE_URL}/user/deleteTask`,{id,index}).then((res)=>{
          console.log(res);
          if(res.status==200){
            findData()
          }
        }).catch(err=>{
          console.log("error occured ",err);
        })
    }
    return (
        <>

            <Header />
            <h1 className='AllTasksTxt'>All Tasks</h1>
            
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
        </>
    )
}

export default ViewAllTask