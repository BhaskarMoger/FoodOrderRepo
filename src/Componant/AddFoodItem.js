import React, { useState } from 'react';
import axios from 'axios';
import "./Page.css";
import { useNavigate } from 'react-router-dom';

const AddFoodItem = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

 
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
      const response = await axios.post(
        "http://localhost:8080/api/v1/Item/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Item Added successful:", response.data);
      navigate("/home");
    } catch (error) {
      console.error(
        "Item Added failed:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <div>
            <nav >
                <h1>Food Order Web Application</h1>
                
            </nav>
    
    <div className='Register'>
        <h2>Add Food</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Food Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Food Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image Url:</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <center>
        <button type="submit">Add Food</button>
        </center>
      </form>
    </div>
    </div>
  );
};

export default AddFoodItem;
