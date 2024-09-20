import React from "react";
import {  Route, Routes, BrowserRouter } from "react-router-dom";
import UserLogin from './Componant/UserLogin';
import Home from './Componant/Home';
import UserRegister from "./Componant/UserRegister";
import SellerLogin from "./Componant/SellerLogin";
import AdminLogin from "./Componant/AdminLogin";
import SellerRegister from "./Componant/SellerRegister";
import AdminRegister from "./Componant/AdminRegister";
import List from "./Componant/List";
import FoodList from "./Componant/FoodList";
import Cart from "./Componant/Cart";
import Order from "./Componant/Order";
import History from "./Componant/History";
import UpdateDetails from "./Componant/UpdateDetails";
import AddFoodItem from "./Componant/AddFoodItem";


const App = ()=> {
  return (
    <>
    <div>
      <BrowserRouter>
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<UserLogin />} />
          <Route path="/seller" element={<SellerLogin/>} />
          <Route path="/admin" element={<AdminLogin/>} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/seller/register" element={<SellerRegister />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/userDetails" element={<List />} />
          <Route path="/product" element={<FoodList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<UpdateDetails />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addFood" element={<AddFoodItem />} />

        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
};
export default App;
