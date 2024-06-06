import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/userSlice.js";

const pageContext = createContext(null);

export default function ProfileOutlet() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const linkIsEqual = (link) => {
    return location.pathname === link || location.pathname === link + "/";
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(logoutUser());
      if (response.error) {
        throw new Error(response.error);
      }
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (location.pathname === "/profile" || location.pathname === "/profile/") {
      navigate("/profile/personal");
    }
  }, []);

  return (
    <div className="profile flex flex-col wrapper mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between gap-5 mt-24 mb-[3rem] items-center mt-24">
        <h1 className="text-3xl font-bold text-center">Личный кабинет</h1>
        <form method="POST" onSubmit={(e) => handleLogout(e)}>
          <button
            type="submit"
            className="bg-white hover:bg-[#F35E62] text-[#F35E62] hover:text-white border-2 border-[#F35E62] font-medium rounded-lg py-1 px-4"
          >
            Выйти
          </button>
        </form>
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:items-start xl:justify-items-start">
        <div className="flex flex-col gap-4 w-fit">
          <Link
            to="/profile/personal"
            className={
              (linkIsEqual("/profile/personal")
                ? "data-switch-btn_active "
                : "") +
              "w-72 data-switch-btn bg-white border-2 border-[#F35E62] text-[#F35E62] font-medium text-xl px-10 py-1.5 rounded-r-lg"
            }
          >
            Личные данные
          </Link>
          <Link
            to="/profile/orders"
            className={
              (linkIsEqual("/profile/orders")
                ? "data-switch-btn_active "
                : "") +
              "w-72 data-switch-btn bg-white border-2 border-[#F35E62] text-[#F35E62] font-medium text-xl px-10 py-1.5 rounded-r-lg"
            }
          >
            История заказов
          </Link>
        </div>
        <div className="w-full flex justify-center lg:pr-0 xl:pl-6 mt-24 lg:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
