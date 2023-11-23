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
          </Route>
        </Routes>
      </UserContextProvider>
    </Provider>
  </BrowserRouter>
);
