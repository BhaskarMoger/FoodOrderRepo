import React, { Component } from 'react';
import UserService from '../Service/UserService';
import SellerService from '../Service/SellerService';

class List extends Component {

    constructor(props) {
        super(props)
        this.state={
            userlist:[],
            sellerlist: [] 
            
        }
       
    }
    componentDidMount(){
        UserService.getUsers().then((res) =>{
            this.setState({userlist: res.data })
        });
        SellerService.getSellers().then((res) => {
            this.setState({ sellerlist: res.data });
        });
    }
    deleteUser(id) {
        // Delete the user by ID and update the user list after deletion
        UserService.deleteUser(id).then(() => {
            this.setState({
                userlist: this.state.userlist.filter(user => user.id !== id)
            });
        }).catch((err) => {
            console.error("Error deleting user:", err);
        });
    }
    deleteSeller(id) {
        // Delete the seller by ID and update the seller list after deletion
        SellerService.deleteSeller(id).then(() => {
            this.setState({
                sellerlist: this.state.sellerlist.filter(seller => seller.id !== id)
            });
        }).catch((err) => {
            console.error("Error deleting seller:", err);
        });
    }


    render() {
        return (
            <div>
            <nav >
            <div className='profile'><a href='/product'><img src='https://twincitieskidsclub.com/wp-content/uploads/2020/01/AdobeStock_279757406-scaled.jpeg' style={{width: 100, height:50}}></img>ViewProduct</a></div>
                <h1>Food Order Web Application</h1>
                
            </nav>
            <div>
                <h2 className='text-center'> User List</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead >
                            <tr className='tab'>
                                <td> User Id</td>
                                <td> User Name</td>
                                <td> Password</td>
                                <td> First Name</td>
                                <td> Last Name</td>
                                <td> Mobile Number</td>
                                <td> Email</td>
                                <td> Address</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.userlist.map(
                                    users =>
                                        <tr key={users.id}>
                                            <td>{users.id}</td>
                                            <td>{users.userName}</td>
                                            <td>*********</td>
                                            <td>{users.firstName}</td>
                                            <td>{users.lastname}</td>
                                            <td>{users.mobileNo}</td>
                                            <td>{users.emailId}</td>
                                            <td>{users.address}</td>
                                            <td><button 
                                                    onClick={() => this.deleteUser(users.id)} 
                                                    className="btn btn-danger"
                                                >
                                                    Delete
                                                </button></td>
                                        </tr>

                                )
                            }
                        </tbody>

                    </table>
                </div>
                <h2 className='text-center'> Seller List</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr className='tab'>
                                <td> Seller Id</td>
                                <td> Seller Name</td>
                                <td> Password</td>
                                <td> First Name</td>
                                <td> Last Name</td>
                                <td> Mobile Number</td>
                                <td> Email</td>
                                <td> Address</td>
                                <td>Action</td>
                            </tr>
                            </thead>
                        <tbody>
                            {
                                this.state.sellerlist.map(
                                    sellers =>
                                        <tr key={sellers.id}>
                                            <td>{sellers.id}</td>
                                            <td>{sellers.userName}</td>
                                            <td>*********</td>
                                            <td>{sellers.firstName}</td>
                                            <td>{sellers.lastname}</td>
                                            <td>{sellers.mobileNo}</td>
                                            <td>{sellers.emailId}</td>
                                            <td>{sellers.address}</td>
                                            <td>
                                                <button 
                                                    onClick={() => this.deleteSeller(sellers.id)} 
                                                    className="btn btn-danger"
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>

                                )
                            }
                        </tbody>

                    </table>


                </div>

            </div>
            </div>
        );
    }
}

export default List;
