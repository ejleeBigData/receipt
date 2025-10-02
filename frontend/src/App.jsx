import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import useAuthStore from "./store/authStore";
import OAuth2Callback from "./pages/OAuth2Callback.jsx";
import Layout from "./layout/layout";
import Home from "./pages/home.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";

function App() {
  const { isAuthenticated } = useAuthStore();

  console.log(isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/oauth2/callback" element={<OAuth2Callback />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
