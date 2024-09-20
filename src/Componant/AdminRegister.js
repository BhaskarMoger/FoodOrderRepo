import React, { useState } from 'react';
import axios from 'axios';
import "./Page.css";
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
    const navigate = useNavigate();
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastname: "",
    emailId: "",
    mobileNo: "",
    address: "",
    userName: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/Admin/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Registration successful:", response.data);
      navigate("/admin");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <div>
            <nav >
                <h1>Food Order Web Application</h1>
                
            </nav>
    <section className='image' style={{ backgroundImage: "url('https://in.images.search.yahoo.com/search/images?p=for+login+background+image&fr=mcafee&type=E210IN885G0&imgurl=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp9764031.jpg#id=7&iurl=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp9764031.jpg&action=click')",}}>
    <div className='Register'>
        
         <table>
        <tr  ><td className='color'><a href="/admin/register">Admin Register</a></td>
        <td><a href="/seller/register">Seller Register</a></td>
        <td><a href="/register">User Register</a></td></tr>
      </table>
        <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            pattern="[0-9]{10}"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <center>
        <button type="submit">Register</button>
        <p> If you already have an account<a href="/">  click here</a> </p>
        </center>
      </form>
    </div>
    </section>
    </div>
  );
};

export default AdminRegister;
