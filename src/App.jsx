import "./index.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./pages/menu";
import MainPage from "./pages/mainPage";
import Delivery from "./pages/Delivery";
import Contacts from "./pages/Contacts";
import Promo from "./pages/Promo";
import Help from "./pages/Help";
import Personal from "./pages/Personal.jsx";
import Cart from "./pages/Cart";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import ProfileOutlet from "./pages/ProfileOutlet.jsx";
import Orders from "./pages/Orders.jsx";
import Error_404 from "./pages/404.jsx";
import CheckAuth from "./components/CheckAuth.jsx";
import CheckGuest from "./components/CheckGuest.jsx";

function App() {
  const [category, setCategory] = useState("combo");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <CheckAuth>
            <MainPage setCategory={setCategory} />
          </CheckAuth>
        }
      >
        <Route path="*" element={<Error_404 />} />
        <Route
          index
          element={<Menu category={category} setCategory={setCategory} />}
        />
        <Route path="delivery" element={<Delivery />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="promo" element={<Promo />} />
        <Route path="help" element={<Help />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <ProfileOutlet />
            </RequireAuth>
          }
        >
          <Route path="personal" element={<Personal />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route
          path="login"
          element={
            <CheckGuest>
              <Login />
            </CheckGuest>
          }
        />
        <Route
          path="register"
          element={
            <CheckGuest>
              <Register />
            </CheckGuest>
          }
        />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
