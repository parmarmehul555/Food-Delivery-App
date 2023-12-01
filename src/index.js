import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import UserModelProvider from './Components/UserModelProvider';
import UserContextProvider from './context/UserContextProvider';
import Food from './Components/Food';
import { Provider } from 'react-redux';
import store from './store';
import OneFood from './Components/OneFood';
import Cart from './Components/Cart';
import Order from './Components/Order';
import SellerModelProvider from './Components/Seller components/SellerModelProvider';
import SellerHome from './Components/Seller components/SellerHome';
import AddFood from './Components/Seller components/AddFood';
import SellerFoodContextProvider from './context/SellerFoodContextProvider';
import ChangeFood from './Components/Seller components/ChangeFood';
import EditFood from './Components/Seller components/EditFood';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path='/food/auth/login' element={<UserModelProvider isLogin="true" />} />
            <Route path='/food/auth/signup' element={<UserModelProvider />} />
            <Route path='/user' element={<Food />} />
            <Route path='/food/:restoName' element={<OneFood />} />
            <Route path='/food/foocart' element={<Cart />} />
            <Route path='/user/yourorders' element={<Order />} />
            <Route path='/seller/login' element={<SellerModelProvider isLogin="true" />} />
            <Route path='/seller/signup' element={<SellerModelProvider />} />
            <Route path='/seller/dashboard' element={<SellerHome />} />
            <Route path='/seller/addfooddata' element={<AddFood />} />
            <Route path='/seller/:foodId' element={<EditFood />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </Provider>
  </BrowserRouter>
);
