import React, { Component } from "react";
import OrderHistoryService from "../Service/OrderHistoryService";

const adminId = sessionStorage.getItem("adminId");
const userId = sessionStorage.getItem("userId");

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderlist: [],
    };
  }

  componentDidMount() {
    if (adminId) {
      OrderHistoryService.getOrders()
        .then((res) => {
          this.setState({ orderlist: res.data });
        })
        .catch((error) => console.error("Error fetching all orders:", error));
    } else if (userId) {
      OrderHistoryService.getOrderByUserId(userId)
        .then((res) => {
          this.setState({ orderlist: res.data });
        })
        .catch((error) => console.error("Error fetching user orders:", error));
    }
  }
  handleClick1 = () => {
    this.props.navigate("/cart");
  };
  render() {
    return (
      <div>
        <nav>
          <h1>Food Order Web Application</h1>
          {adminId ? (
            <a href="/product">Back to Home</a>
          ) : (
            <a href="/cart"> Back to Cart</a>
          )}
        </nav>
        <div>
          <h2 className="text-center"> Ordered History</h2>
          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr className="tab">
                  <td> Order Id</td>
                  <td> First Name</td>
                  <td> Last Name</td>
                  <td> Mobile Number</td>
                  <td> Adress</td>
                  <td> Payment Method</td>
                  <td>Amount</td>
                  <td>Quantity</td>
                  <td>Purchased Date</td>
                </tr>
              </thead>
              <tbody>
                {this.state.orderlist.map((orders) => (
                  <tr key={orders.id}>
                    <td>{orders.id}</td>
                    <td>{orders.firstName}</td>
                    <td>{orders.lastname}</td>
                    <td>{orders.mobileNo}</td>
                    <td>{orders.address}</td>
                    <td>{orders.payment}</td>
                    <td>{orders.amount}</td>
                    <td>{orders.quantity}</td>
                    <td>{orders.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
