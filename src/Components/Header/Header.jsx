import React, { useEffect, useState } from 'react'
import './Header.css'

import Offcanvas from 'react-bootstrap/Offcanvas';

import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Services/baseUrl';
import { notifyError, notifyWarning } from '../Toast/Toast';
import { ToastContainer } from 'react-toastify';
function Header() {
  const handleDashboard=()=>{
    navigate('/dashboard')
    handleClose()
  }
  const handleNotification=()=>{
    // handleClose()
    notifyWarning("Notification feature will be added soon")
    // navigate('')
  }
  // const [tasksData,setTaskData]=useState('')
  const [email,setEmail]=useState('')
  useEffect(()=>{
    const id=localStorage.getItem('id')
    if(!id){
      alert("please login")
      navigate('/signin')
    }
    // console.log(id);
    axios.post(`${BASE_URL}/user/gettask`,{id}).then((res)=>{
      // console.log(res);
      // const {tasks}=res.data
      const {email}=res.data
      // setTaskData(tasks)
      setEmail(email)
    }).catch(err=>{
      // console.log("error occured ",err);
      notifyError(err)
    })
  },[])

  const navigate=useNavigate()
  const handleLogout= ()=>{
    localStorage.clear()
    navigate('/')
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateTask= ()=>{
    navigate('/taskmanager')
  }
  const handleViewTask=()=>{
    navigate('/viewAllTasks')
  }
  return (

  
    <>
      <div className="topHeader">
        
      <div className='menuBtnAndTitle'>
        <div className='menuBtn'onClick={handleShow} >
          <span className="material-symbols-outlined">
            menu
          </span>
        </div>
        <h1 className='title'>Task Management System</h1>
      </div>
  
      <div className='userBtn'>
        <img style={{with:"25px",height:"25px",paddingTop:"3px"}} src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" alt="usericon" />
        <NavDropdown 
          id="nav-dropdown-dark-example"
          title="user"
  
        >
  
          <NavDropdown.Item onClick={handleLogout}>
            Logout
          </NavDropdown.Item>
     
          {/* <NavDropdown.Divider />
          <NavDropdown.Item >
            Delete account
          </NavDropdown.Item> */}
        </NavDropdown>
  
  
        
        <Offcanvas style={{ background: "black", color: "white" }} show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title><i className="fa-sharp fa-solid fa-people-roof fa-flip" style={{color:"#ff8000",paddingRight:'10px'}}></i>Welcome!</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="loginDetail">
            <img style={{with:"60px",height:"60px"}} src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" alt="usericon" />
              <div className='userDetails'>
                <h4 className='userTxt'>User</h4>
                <div className="loginIndicator"></div>
                <h3 className='emailIdTxt'>{email ? email : 'Loading'}</h3>
              </div>
            </div>
            <div className="Option">
              <button  onClick={handleDashboard} className='optionsBtn'><span className="material-symbols-outlined optionIcon">
  dashboard
  </span>Dashboard</button>
              
  <button onClick={handleCreateTask} className='optionsBtn'><span className="material-symbols-outlined optionIcon">
  add_circle
  </span>Create Task</button>
  <button onClick={handleViewTask} className='optionsBtn'><span className="material-symbols-outlined optionIcon">
  visibility
  </span>View All Task</button>
  <button onClick={handleNotification} className='optionsBtn'><span className="material-symbols-outlined optionIcon">
  notifications
  </span>Notifications</button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
  
  </div>
  <ToastContainer />
    </>
  )
}

export default Header