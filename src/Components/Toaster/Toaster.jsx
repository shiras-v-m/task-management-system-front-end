import React, { useEffect } from 'react'
import  { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Toast from 'react-bootstrap/Toast';
function Toaster(showScreen) {
    useEffect(()=>{
        const [show, setShow] = useState(false);
        if(showScreen==true){
           setShow(true)
        }
    },[showScreen])
    
  return (
    <div className='frame'>
     <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
    </div>
  )
}

export default Toaster