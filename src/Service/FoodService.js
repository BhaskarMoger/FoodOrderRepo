import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/Item';

class FoodService {
    getFoodItems() {
        return axios.get(API_URL);
    }
    deleteFoodItem(itemId) {
        return axios.delete(`${API_URL}/${itemId}`);
    }

}

export default new FoodService();