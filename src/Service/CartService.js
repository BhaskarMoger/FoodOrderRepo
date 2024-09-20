import axios from 'axios';

const CART_API_BASE_URL = 'http://localhost:8080/api/v1/Cart';
const Cart_API = "http://localhost:8080/api/v1/Cart/Cart";

class CartService {
    addToCart(userId, foodItemId, quantity) {
        return axios.post(`${CART_API_BASE_URL}/add`, {
            userId,
            foodItemId,
            quantity
        });
    }

    getCartItems(userId) {
         return axios.get(`${CART_API_BASE_URL}/User/${userId}`);
    }
    
    //getCartItems(userId) {
      //  return axios.get(Cart_API);
     //}

    removeCartItem(cartId) {
        return axios.delete(`${CART_API_BASE_URL}/remove/${cartId}`);
    }
}

export default new CartService();