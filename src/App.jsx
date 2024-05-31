import "./index.css";
import React, { useState } from "react";
import { Routes, Route, ScrollRestoration } from "react-router-dom";
import Menu from "./pages/menu";
import MainPage from "./pages/mainPage";
import Delivery from "./pages/Delivery";
import Contacts from "./pages/Contacts";
import Promo from "./pages/Promo";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  const [category, setCategory] = useState("combo");

  return (
    <Routes>
      <Route path="/" element={<MainPage setCategory={setCategory} />}>
        <Route
          index
          element={<Menu category={category} setCategory={setCategory} />}
        />
        <Route path="delivery" element={<Delivery />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="promo" element={<Promo />} />
        <Route path="help" element={<Help />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
