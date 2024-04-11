import React from 'react'
import './style.scss'
import logo from '../../assets/logo.png'
import userIcon from '../../assets/userIcon.png'
function Header({user,logOut}) {
  return (
    <div className='header'>
        <div>
        <p className='createdBy'>Created By Mayank Kumar Ratre</p>
        <img src={logo} alt="N/A" />
        </div>
        <div className='user'>
        <img className='userIcon' src={userIcon} alt="N/A" />
        <p>{user.userName}</p>
        <button className='logOut' onClick={logOut}>Log Out</button>
        </div>
    </div>
  )
}

export default Header
