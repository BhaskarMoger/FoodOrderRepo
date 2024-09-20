import axios from 'axios';
const ORDER_API_BASE_URL = "http://localhost:8080/api/v1/Order"; // Change URL as per your backend API

class OrderHistoryService {
    getOrders() {
        return axios.get(ORDER_API_BASE_URL);
    }
    getOrderByUserId(userId) {
        return axios.get(`${ORDER_API_BASE_URL}/User/${userId}`);
   }
}

export default new OrderHistoryService();