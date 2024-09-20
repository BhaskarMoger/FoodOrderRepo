import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Page.css";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Order = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { price } = location.state; 
    
    const [user, setUserId] = useState(null);
    useEffect(() => {
  
      const user = sessionStorage.getItem('userId');
      if (user) {
        setFormData((prevState) => ({
          ...prevState,
          userId: user
      }));
    }
  }, []); 
 
  const [formData, setFormData] = useState({
    firstName: "",
    lastname: "",
    mobileNo: "",
    address: "",
    payment: "",
    amount: price,
    quantity: 1 ,
    userId: "",

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
        "http://localhost:8080/api/v1/Order/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/history");
    } catch (error) {
      console.error(
        "Failed to order:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <div>
            <nav >
                <h1>Food Order Web Application</h1>
                <a href='/cart'> Back to Cart</a>
            </nav>
    
    <div className='Register'>
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
              <label>Payment Method:</label>
              <div>
                <input
                  type="radio"
                  name="payment"
                  value="Credit Card"
                  checked={formData.payment === "Credit Card"}
                  onChange={handleChange}
                />
                <label>Credit Card</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  value="Cash"
                  checked={formData.payment === "Cash"}
                  onChange={handleChange}
                />
                <label>Cash</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={formData.payment === "UPI"}
                  onChange={handleChange}
                />
                <label>UPI</label>
              </div>
            </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={1}
            onChange={handleChange}
            required
          />
        </div>

        <center>
        <button type="submit">Place Order</button>
        </center>
      </form>
    </div>
 
    </div>
  );
};

export default Order;
