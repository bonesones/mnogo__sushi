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
import Promocodes from "./pages/Admin/promocodes/Promocodes.jsx";
import Questions from "./pages/Admin/questions/Questions.jsx";
import Products from "./pages/Admin/products/Products.jsx";
import ProductEditFrom from "./pages/Admin/products/ProductEditFrom.jsx";
import Categories from "./pages/Admin/Categories.jsx";
import PromotionForm from "./pages/Admin/promotions/PromotionForm.jsx";
import PromotionEditForm from "./pages/Admin/promotions/PromotionEditForm.jsx";
import PromocodeForm from "./pages/Admin/promocodes/PromocodeForm.jsx";
import PromocodeEditForm from "./pages/Admin/promocodes/PromocodeEditForm.jsx";
import QuestionForm from "./pages/Admin/questions/QuestionForm.jsx";
import QuestionEditForm from "./pages/Admin/questions/QuestionEditForm.jsx";
import Slides from "./pages/Admin/Slider/Slides.jsx";
import SlideForm from "./pages/Admin/Slider/SlideForm.jsx";
import SlideEditForm from "./pages/Admin/Slider/SlideEditForm.jsx";
import api from "./services/api.js";
import Users from "./pages/Admin/users/Users.jsx";
import UserEditForm from "./pages/Admin/users/UserEditForm.jsx";
import UserForm from "./pages/Admin/users/UserForm.jsx";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    setScroll(window.scrollY);
    console.log(window.scrollY)
  };

  useEffect(() => {
    const fetchServer = async () => {
      try {
        await api.get("/api");
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Routes>
      <Route path="500" element={<Error_500 />} />
      <Route path="/" element={<MainPage scroll={scroll} />}>
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
            <Route
              path="promotion_edit/:promotionId"
              element={<PromotionEditForm />}
            />
          </Route>
          <Route path="promocodes">
            <Route path="" element={<Promocodes />} />
            <Route path="create_promocode" element={<PromocodeForm />} />
            <Route
              path="promocode_edit/:promocodeId"
              element={<PromocodeEditForm />}
            />
          </Route>
          <Route path="faq">
            <Route path="" element={<Questions />} />
            <Route path="create_question" element={<QuestionForm />} />
            <Route
              path="question_edit/:questionId"
              element={<QuestionEditForm />}
            />
          </Route>
          <Route path="slides">
            <Route path="" element={<Slides />} />
            <Route path="create_slide" element={<SlideForm />} />
            <Route path="slide_edit/:slideId" element={<SlideEditForm />} />
          </Route>
          <Route path="users">
            <Route path="" element={<Users />} />
            <Route path="create_user" element={<UserForm />} />
            <Route path="user_edit/:userId" element={<UserEditForm />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
