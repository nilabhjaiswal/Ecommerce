import React, { useEffect } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";

import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer";

import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import Profile from "./components/User/Profile.js";
import { ProtectedRoute } from "protected-route-react";
import LoginSignUp from "./components/User/LoginSignUp.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";


import ForgotPassword from "./components/User/ForgotPassword.js";
// import ResetPassword from "./components/User/ResetPassword.js";

import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />

        <Route
          exact
          path="/account"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/me/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateProfile/>
            </ProtectedRoute>
          }
        />
        {/* isAuthenticated={isAuthenticated} use this code of line inside ProtectedRoute tag */}
        <Route 
          exact
          path="/password/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        {/* <Route exact path="/password/reset/:token" element={<ResetPassword />} /> */}
        <Route exact path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
