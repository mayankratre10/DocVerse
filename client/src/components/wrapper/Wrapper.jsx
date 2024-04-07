import React, { useEffect } from 'react'
import './style.scss'
import Document from './document/Document'
import { callServer } from '../../utils/helper'

function Wrapper({user}) {

    useEffect(()=>{
        const loadData =async()=>{
            const formData = {
                "UserName":user.userName,
            }
            const response = await callServer('get','/documents',formData);
            // console.log("df;ljdlkfj")
            console.log(response)
        }
        loadData();
    },[])

  return (
    <div className='wrapper'>
      <Document/>
    </div>
  )
}

export default Wrapper
