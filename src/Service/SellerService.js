import axios from 'axios';
const SELLER_API_BASE_URL = "http://localhost:8080/api/v1/Seller"; // Change URL as per your backend API

class SellerService {
    getSellers() {
        return axios.get(SELLER_API_BASE_URL);
    }

    deleteSeller(id) {
        return axios.delete(`${SELLER_API_BASE_URL}/${id}`);
    }
}

export default new SellerService();