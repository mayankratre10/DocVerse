import React from "react";
import "./style.scss";
import { callServer } from "../utils/helper";

function  SignUp ({setContent}) {

    const formValidation =async(e)=>{
        e.preventDefault()
        
        const formData = {
            'userName':userName.value,
            'emailID':email.value,
            'password':password.value,
        }
        // formData.append('file', selectedFile); 

        if(formData.userName.length==0 || formData.emailID.length==0|| formData.password.length==0){
            
            document.getElementById("warning").setAttribute("style", "display:inline");

            return false;
        }
        
        const response = await callServer('post','/createUser',formData);
        console.log(response)
        if(response.success==true){
            setContent('signin');
        }
    }

  return (
    <div className="container">
      <form onSubmit={formValidation}>
        <h2>Sign Up</h2>
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          id="userName"
          name="userName"
          placeholder="Enter userName"
        />
        <label htmlFor="email">EmailID:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter EmailID"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter Password"
        />
        <p id="warning" className="warning">Please Enter All Your Credentials</p>
        <button type="submit">Sign Up</button>
      </form>
        <div className="toggle">
            <p>Already have an account?</p>
            <p className="change" onClick={()=>setContent('signin')}>SignIn</p>
        </div>
    </div>
    
  );
}

export default SignUp;
