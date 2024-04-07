import React from "react";
import axios from 'axios';
import "./style.scss";
import { callServer } from "../utils/helper";


function SignIn({setContent}) {
    const formValidation = async(e)=>{
        e.preventDefault()
        const formData = {
            'userName':userName.value,
            'password':password.value,
        }

        if(formData.userName.length==0 || formData.password.length==0){
            
            document.getElementById("warning").setAttribute("style", "display:inline");

            return false;
        }
        
        const response = await callServer('post','/signIn',formData);
        if(response.success==true){
            localStorage.setItem('token',response.data);
            setContent('home');
        }
    }

  return (
    <div className="container">
      <form onSubmit={formValidation}>
        <h2>Sign In</h2>
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          id="userName"
          name="userName"
          placeholder="Enter Username"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter Password"
        />
        <p id="warning" className="warning">Please Enter All Your Credentials</p>
        <button type="submit">Sign In</button>
      </form>
      <div className="toggle">
            <p>Don't have an account?</p>
            <p className="change" onClick={()=>setContent('signup')}>SignUp</p>
        </div>
    </div>
  );
}

export default SignIn;
