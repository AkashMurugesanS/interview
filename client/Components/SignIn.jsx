import React, { useEffect,useState } from 'react'
import { getaccessToken, useLoginApiMutation } from '../src/Features/apiCall'
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  
  const navigate = useNavigate();
  const [loginDetailssend, { data, isError, isLoading, isSuccess }] =
    useLoginApiMutation();
    
    const handleChange =(e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,  
      });
    };
  const loginSubmit = async (e) => {

    e.preventDefault()
    console.log("Received values of form: ", formData);
    try {
      const abcd = await loginDetailssend(formData).unwrap();

        alert(
           "sucess!",
        );
        navigate("/");
      
    } catch (error) {
      if (error && error?.status != 200) {
        alert({
          "message": "Fail!",
          "description": error?.message,
        });
      }
    }
  };

  useEffect(() => {
    let v = getaccessToken();
    if (data?.token) {
      const gg = localStorage.setItem("interview", data?.token);

      navigate("/");
    } else if (v) {
      navigate("/");
    }
  }, [data]);
  return (
    <div className="container mt-3">
    <h2>Sign In</h2>
    <form  method='post'>
      <div className="mb-3 mt-3">
        <label htmlFor="email">Email:</label>
        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"  onChange={handleChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="pwd">Password:</label>
        <input type="password" className="form-control" id="password" placeholder="Enter password" name="pswd"  onChange={handleChange} />
      </div>
      <button className="btn btn-primary" onClick={(e)=>loginSubmit(e)}>Submit</button>
    </form>
  </div>
  )
}
