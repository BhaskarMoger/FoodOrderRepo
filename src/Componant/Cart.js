import React, { useState, useEffect } from 'react';
import CartService from '../Service/CartService';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cart, setCartItems] = useState([]);  // Ensure cart is initialized as an empty array
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            setUserId(userId);

            // Fetch cart items once userId is set
            CartService.getCartItems(userId)
                .then((res) => {
                    const cartData = res.data.cartItems;

                    // Ensure cartData is an array before setting it in state
                    if (Array.isArray(cartData)) {
                        setCartItems(cartData);
                    } else {
                        console.error('Expected cart data to be an array but got:', cartData);
                        setCartItems([]); // Default to empty array if the data is not an array
                    }
                })
                .catch((error) => {
                    console.error('Error fetching cart items:', error);
                    setCartItems([]);  // Default to empty array in case of error
                });
        }
    }, []);

    const removeCartItem = (cartId) => {
        CartService.removeCartItem(cartId)
            .then(() => {
                // Filter out the removed item from the cart array
                setCartItems(cart.filter(item => item.id !== cartId));
                alert("Item Removed Successfully");
            })
            .catch(error => console.error('Error removing item:', error));
    };

    const handleClick = (price) => {
        navigate('/order', { state: { price } });
    };

    return (
        <div>
            <nav>
                <h1>Food Order Web Application</h1>
                <a href='/product'>Home</a>
            </nav>
            <div>
                <h2 className='center'>Welcome to Your Cart</h2>
                <div className="food-list">
                    {
                        cart.map((cartItems) => (
                            <div key={cartItems.id} className="food-card">
                                <img src={cartItems.imageUrl} alt={cartItems.imageName} className="food-image" />
                                <h3>{cartItems.imageName}</h3>
                                <p>{cartItems.description}</p>
                                <p>Price: ₹{cartItems.price}</p>
                                <p>Quantity: {cartItems.quantity}</p>
                                <button className='btn' onClick={() => removeCartItem(cartItems.id)}>Remove</button>
                                <button className='btn1' onClick={() => handleClick(cartItems.price)}>Order</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;
