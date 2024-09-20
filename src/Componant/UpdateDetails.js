import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Page.css";
import { useNavigate } from 'react-router-dom';

const UpdateDetails = () => {
    const [id, setId] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastname: "",
        emailId: "",
        mobileNo: "",
        address: "",
        userName: "",
        password: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const sellerId = sessionStorage.getItem('sellerId');
        const adminId = sessionStorage.getItem('adminId');

        if (userId) {
            setId(userId);
            fetchUserData(userId);
        } else if (sellerId) {
            setId(sellerId);
            fetchSellerData(sellerId);
        } else if (adminId) {
            setId(adminId);
            fetchAdminData(adminId);
        }
    }, []);



    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/User/${userId}`);
            setFormData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

   
    const fetchSellerData = async (sellerId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/Seller/${sellerId}`);
            setFormData(response.data);
        } catch (error) {
            console.error("Error fetching seller data:", error);
        }
    };


    const fetchAdminData = async (adminId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/Admin/${adminId}`);
            setFormData(response.data);
        } catch (error) {
            console.error("Error fetching admin data:", error);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userId = sessionStorage.getItem('userId');
            const sellerId = sessionStorage.getItem('sellerId');
            const adminId = sessionStorage.getItem('adminId');

            if (userId) {
                await axios.put(
                    `http://localhost:8080/api/v1/User/update/${userId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            } else if (sellerId) {
                await axios.put(
                    `http://localhost:8080/api/v1/Seller/update/${sellerId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            } else if (adminId) {
                await axios.put(
                    `http://localhost:8080/api/v1/Admin/update/${adminId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            }
            alert("Updated Successfully");
            navigate("/profile"); 
        } catch (error) {
            console.error(
                "Update failed:",
                error.response ? error.response.data : error.message
            );
        }
    };

    return (
        <div>
            <nav>
                <h1>Food Order Web Application</h1>
                <a href='/product'>Back to Home</a>
            </nav>
            <div className='Register'>
                <h2>Update Profile</h2>
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
                        <button type="submit">Update</button>
                    </center>
                </form>
            </div>
        </div>
    );
};

export default UpdateDetails;
