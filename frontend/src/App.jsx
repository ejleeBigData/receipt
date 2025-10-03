import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import useAuthStore from "./store/authStore";
import OAuth2Callback from "./pages/OAuth2Callback.jsx";
import Layout from "./layout/layout";
import Home from "./pages/home.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Data from "./pages/data.jsx";
import Category from "./pages/category.jsx";

function App() {
  const { isAuthenticated } = useAuthStore();

  console.log("권한:", isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="oauth2/callback" element={<OAuth2Callback />} />
          <Route path="login" element={<Login />} />

          <Route
            path="data"
            element={
              isAuthenticated ? <Data /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="category"
            element={
              isAuthenticated ? <Category /> : <Navigate to="/login" replace />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
