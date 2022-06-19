import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'


const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""}) 
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const{name, email, password} = credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, email, password})
      });
      const json = await response.json()
      console.log(json);
      if (json.success){
          // Save the auth token and redirect
          localStorage.setItem('token', json.authtoken); 
          navigate("/login");


      }
      else{
          alert("Invalid credentials");
      }
  }

  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }






  return (
    <>
     <div className="container">
     <h2>SignUp</h2>
     <h5>Welcome!</h5>
    <form  onSubmit={handleSubmit}>
    <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name"  onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control"  id="password" onChange={onChange} name="password" />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" onChange={onChange}  id="cpassword" name="cpassword" />
        </div>
       
        <button type="submit" className="btn btn-outline-dark">Signup</button>
      </form>
    </div>
    </>
  )
}

export default Signup