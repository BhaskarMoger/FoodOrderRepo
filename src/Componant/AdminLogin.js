import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Page.css";


const AdminLogin = () => {
 
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const loginData = {
    userName,
    password
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch("http://localhost:8080/api/v1/Admin/login",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
        
      });

      if (response.status === 200) {
        const data = await response.json();
        sessionStorage.setItem ('adminId', data.userId); 
        console.log("Admin ID:", data.userId);
          console.log('Login successful');
        navigate("/userDetails");
      }
      else{
        alert("Login Failed. Please check your credentials."); 
      }
      
      

    } catch (err) {
      setError("Invalid credentials");
    }
   
  };

  return (
    <div>
            <nav >
                <h1>Food Order Web Application</h1>
                
            </nav>
    <div className="login-box">

      <table>
        <tr><td className='color'><a href="/admin">Admin Login</a></td>
        <td><a href="/seller">Seller Login</a></td>
        <td><a href="/">User Login</a></td></tr>
      </table>
      <h2>Login</h2>
      <form Class="" onSubmit={handleSubmit}>
        <label>User Name</label><br/>
        <input type="text"  value={userName} onChange={(e) => setUsername(e.target.value)} /><br/>
        <label>Password </label><br/>
        <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
        <button type="submit">Login</button>
        <p> If you don't have account please<a href="/register">click here</a> </p>
      </form>
      {error && <p>{error}</p>}
    </div>
    </div>
  );
};
export default AdminLogin;
