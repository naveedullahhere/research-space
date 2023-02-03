
import './App.css';
import { Header } from './Component/layout/Header';
import { MainRoutes } from './MainRoutes';
import { AppContext } from "./context/AppContext.js";
import { useState, useEffect, useRef } from 'react';
import { URL, APP_NAME, API_TOKEN, SITE_URL, GOOGLE_CLIENT_ID } from './config'
import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { removeUserData, addUserData, updateUserData, setCartItems, removeCartItems, manageQuantity } from './actions';

import { Footer1 } from './Component/layout/Footer1';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartReducer);
  const user = useSelector((state) => state.userReducer.user[0]);
 

  const [Title, setTitle] = useState(`Home${APP_NAME}`);


  document.title = Title;

  var values = {
    setCartItems, cartItems, SITE_URL, API_TOKEN, setTitle, Title, APP_NAME, URL, removeCartItems, manageQuantity, removeUserData, addUserData, updateUserData, dispatch, user
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>

      <AppContext.Provider value={values}>

        <BrowserRouter>
          <Header />
          <MainRoutes />
          <Footer1 />
          <Toaster position="top-right" containerStyle={{ "transform": "translateY(104px)" }} />
        </BrowserRouter>
      </AppContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
