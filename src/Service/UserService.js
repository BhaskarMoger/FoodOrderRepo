import axios from 'axios';

const Base_Url = "http://localhost:8080/api/v1/User";
const seller_url = "http://localhost:8080/api/v1/Seller";
const delete_url = "http://localhost:8080/api/v1/User/id";

class UserService {

    
        
     getUsers(){
        return axios.get(Base_Url);
     }
     getsellers(){
        return axios.get(seller_url);
     }
     deleteUser(id) {
        return axios.delete(`${Base_Url}/${id}`);
    }
}

export default new UserService;
