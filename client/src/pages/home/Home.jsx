import React, { useEffect, useState } from 'react'
import './style.scss'
import SignUp from '../../components/SignUp'
import SignIn from '../../components/SignIn'
import Header from '../../components/header/Header';
import Wrapper from '../../components/wrapper/Wrapper';
function Home() {
    
    const [content,setContent] = useState('signup');

    const [user, setUser]=useState();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            setUser(JSON.parse(localStorage.getItem('user')));
            setContent('home');
            
        }
    },[])

    const logOut = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setContent('signup')
    }
    
  return (
    <div>
        
        {content=='signin' && <SignIn setUser={setUser} setContent={setContent}/>}
        {content=='signup' && <SignUp setContent={setContent}/>}
        {content=='home'   && 

            <>
                <Header user={user} logOut={logOut}/>
                <Wrapper user={user}/>
            </>

        }
      
    </div>
  )
}

export default Home
