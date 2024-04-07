import React from 'react'
import './style.scss'
import logo from '../../assets/logo.png'
import userIcon from '../../assets/userIcon.png'
function Header({user,logOut}) {
  return (
    <div className='header'>
        <img src={logo} alt="N/A" />
        <div className='user'>
        <img className='userIcon' src={userIcon} alt="N/A" />
        <p>{user.userName}</p>
        <button className='logOut' onClick={logOut}>Log Out</button>
        </div>
    </div>
  )
}

export default Header
