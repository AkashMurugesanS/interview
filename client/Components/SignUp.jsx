

import React, { useEffect,useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { useSignupApiMutation } from '../src/Features/apiCall';


export default function SignUp() {

  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const [signupDetailssend, { data, isError, isLoading, isSuccess }] =
    useSignupApiMutation();

  const handleChange =(e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,  
    });
  };

  const signupSubmit = async (e) => {

    e.preventDefault()
    console.log("Received values of form: ", formData);
    try {
      const abcd = await signupDetailssend(formData).unwrap();

        alert(
           "sucess!",
        );
        navigate("/sign-in");
      
    } catch (error) {
      if (error && error?.status != 200) {
        alert({
          "message": "Fail!",
          "description": error?.message,
        });
      }
    }
  };

  return (
    <div className="container mt-3">
    <h2>Sign Up</h2>
    <form method='post'>
    <div className="mb-3 mt-3">
        <label htmlFor="username">Username:</label>
        <input type="text" className="form-control" id="username" placeholder="Enter username" name="username" onChange={handleChange}/>
      </div>
      <div className="mb-3 mt-3">
        <label htmlFor="email">Email:</label>
        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="pwd">Password:</label>
        <input type="password" className="form-control" id="password" placeholder="Enter password" name="pswd" onChange={handleChange}/>
      </div>
       <button className="btn btn-primary" onClick={(e)=>signupSubmit(e)}>Submit</button>
    </form>
  </div>
  )
}
