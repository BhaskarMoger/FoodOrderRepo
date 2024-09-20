import React, { useState, useEffect } from 'react';
import FoodService from '../Service/FoodService';
import CartService from '../Service/CartService';
import { useNavigate } from 'react-router-dom';
import './Page.css';
const FoodList = () => {
    const [items, setItems] = useState([]);
    const [userId, setUserId] = useState(null); 
    const navigate = useNavigate();
    const sellerId = sessionStorage.getItem('sellerId');

    useEffect(() => {

        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
        const sellerId = sessionStorage.getItem('sellerId');
        if (sellerId) {
            setUserId(sellerId);
        }


        FoodService.getFoodItems()
            .then((res) => {
                setItems(res.data);
            })
            .catch((error) => {
                console.error('Error fetching food items:', error);
            });
    }, []); 

    const addToCart = (foodItemId) => {
        if (sellerId) {
            alert('Only User have the permission');
        }
        else if (userId) {
            CartService.addToCart(userId, foodItemId, 1)
                .then(() => {
                    alert("Item Added Successfully")
                    navigate("/cart");
                })
                .catch((error) => {
                    console.error('Error adding to cart:', error);
                });
        } else {
            alert('Only User have the permission');
        }
    };
    const handleClick = () => {
        sessionStorage.clear();
        navigate("/")
      };
     

    return (
        <div>
            <nav >
                
            <div className='profile'><a href='/profile' ><img src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png' style={{width: 150, height:100}} ></img>Profile</a> </div>
            
            {sellerId ? (
                <a href="#!" ></a>
            ) : (
                <div className='order-det'><a href='/history'><img src='https://vectorified.com/images/ecommerce-icon-9.png' style={{width: 135, height:90}} ></img>Order History</a> </div>
            )}
               <h1>Food Order Web Application</h1>
                <input type='text' placeholder='Search'></input>
                <button>Search</button>
                <button className='btn2' onClick={handleClick}>Log out</button>
            </nav>
        <div className="food-list">
            {items.map(item => (
                <div key={item.id} className="food-card">
                    <img src={item.imageUrl} alt={item.name} className="food-image" />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <h3>₹{item.price}</h3>
                    <button onClick={() => addToCart(item.id)}>Add to Cart</button>

                </div>
            ))}

        </div>
        </div>
    );
};

export default FoodList;
