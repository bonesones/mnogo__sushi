import "./index.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Menu from "./pages/Menu.jsx";
import MainPage from "./layouts/MainPage.jsx";
import Delivery from "./pages/Delivery";
import Contacts from "./pages/Contacts";
import Promo from "./pages/Promo";
import Help from "./pages/Help";
import Personal from "./pages/Personal.jsx";
import Cart from "./pages/Cart";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Profile from "./layouts/Profile.jsx";
import Orders from "./pages/Orders.jsx";
import Error_404 from "./pages/404.jsx";
import CheckAuth from "./components/CheckAuth.jsx";
import CheckGuest from "./components/CheckGuest.jsx";
import Loading from "./components/Loading.jsx";
import axios from "axios";
import Error_500 from "./pages/500.jsx";
import RequireAdminRole from "./components/RequireAdminRole.jsx";
import AdminPage from "./layouts/AdminPage.jsx";
import AdminOrders from "./pages/Admin/orders/Orders.jsx";
import ProductForm from "./pages/Admin/products/ProductForm.jsx";
import Callbacks from "./pages/Admin/callbacks/Callbacks.jsx";
import Promotions from "./pages/Admin/promotions/Promotions.jsx";
import Promocodes from "./pages/Admin/Promocodes.jsx";
import Questions from "./pages/Admin/Questions.jsx";
import Products from "./pages/Admin/products/Products.jsx";
import ProductEditFrom from "./pages/Admin/products/ProductEditFrom.jsx";
import Categories from "./pages/Admin/Categories.jsx";
import PromotionForm from "./pages/Admin/promotions/PromotionForm.jsx";
import PromotionEditForm from "./pages/Admin/promotions/PromotionEditForm.jsx";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchServer = async () => {
      try {
        await axios.get("/api");
      } catch (e) {
        if (e.response && e.response.status === 500) {
          navigate("/500", {
            replace: true,
            state: { path: location.pathname },
          });
        }
      }
    };
    fetchServer();
  }, []);

  return (
    <Routes>
      <Route path="500" element={<Error_500 />} />
      <Route path="/" element={<MainPage />}>
        <Route path="*" element={<Error_404 />} />
        <Route index element={<Menu />} />

        <Route path="delivery" element={<Delivery />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="promo" element={<Promo />} />
        <Route path="help" element={<Help />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <Profile />
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
        <Route
          path="cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route
          path="admin"
          element={
            <RequireAdminRole>
              <AdminPage />
            </RequireAdminRole>
          }
        >
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products">
            <Route path="" element={<Products />} />
            <Route path="create_product" element={<ProductForm />} />
            <Route
              path="product_edit/:productId"
              element={<ProductEditFrom />}
            />
          </Route>
          <Route path="categories" element={<Categories />} />
          <Route path="callbacks" element={<Callbacks />} />
          <Route path="promotions">
            <Route path="" element={<Promotions />} />
            <Route path="create_promotion" element={<PromotionForm />} />
            <Route path="promotion_edit/:promotionId" element={<PromotionEditForm />} />
          </Route>
          <Route path="promocodes" element={<Promocodes />} />
          <Route path="faq" element={<Questions />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
