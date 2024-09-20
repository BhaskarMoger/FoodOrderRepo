import React, { useState, useEffect } from 'react';
import FoodService from '../Service/FoodService';
import CartService from '../Service/CartService';
import { useNavigate } from 'react-router-dom';
import './Page.css';
const Home = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        FoodService.getFoodItems()
            .then((res) => {
                setItems(res.data);
            })
            .catch((error) => {
                console.error('Error fetching food items:', error);
            });
    }, []); 
    const deleteFoodItem = (itemId) => {
      FoodService.deleteFoodItem(itemId)
          .then(() => {
            setItems(items.filter(items => items.id !== itemId));
          })
          .catch(error => console.error('Error removing item:', error));
  };
    const handleClick = () => {
      navigate('/addFood');
    };
    
    return (
        <div>
            <nav >
            <div className='profile'><a href='/product'><img src='https://twincitieskidsclub.com/wp-content/uploads/2020/01/AdobeStock_279757406-scaled.jpeg' style={{width: 120, height:80}}></img>ViewProduct</a></div>
                  <h1>Food Order Web Application</h1> <div className='btn4'> <button onClick={handleClick}>Add Food</button> </div>
            </nav>
        <div className="food-list">
            {items.map(item => (
                <div key={item.id} className="food-card">
                    <img src={item.imageUrl} alt={item.name} className="food-image" />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <h3>₹{item.price}</h3>
                    <div className='btn3'>
                    <button onClick={() => deleteFoodItem(item.id)}>Delete Food</button>
                    </div>
                </div>
            ))}

        </div>
        </div>
    );
};

export default Home;
