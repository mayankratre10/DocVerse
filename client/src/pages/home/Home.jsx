import React, { useState } from 'react'
import './style.scss'
import SignUp from '../../components/SignUp'
import SignIn from '../../components/SignIn'

function Home() {
    
    const [content,setContent] = useState('signup');
    
  return (
    <div>
        
        {content=='signin' && <SignIn setContent={setContent}/>}
        {content=='signup' && <SignUp setContent={setContent}/>}
        
      
    </div>
  )
}

export default Home
