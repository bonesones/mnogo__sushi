import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminPageButton from "../components/AdminPageButton.jsx";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(1);
  const [activePath, setActivePath] = useState(location.pathname.split("/")[2]);

  useEffect(() => {
    setActivePath(location.pathname.split("/")[2]);
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate("/admin/orders");
    }
  }, [location.pathname]);

  return (
    <div className="wrapper">
      <h1 className="font-semibold text-3xl mt-24 text-center md:text-left">
        Панель администратора
      </h1>
      <nav className="flex justify-center mt-16">
        <ul className="flex flex-col sm:flex-row flex-wrap gap-6">
          <AdminPageButton
            title={"Заказы"}
            link={"orders"}
            activePath={activePath}
          />
          <AdminPageButton
              title={"Товары"}
              link={"products"}
              activePath={activePath}
          />
          <AdminPageButton
            title={"Создать товар"}
            link={"create_product"}
            activePath={activePath}
          />
          <AdminPageButton
            title={"Заявки обратной связи"}
            link={"callbacks"}
            activePath={activePath}
          />
          <AdminPageButton
            title={"Акции"}
            link={"promotions"}
            activePath={activePath}
          />
          <AdminPageButton
            title={"Промокоды"}
            link={"promocodes"}
            activePath={activePath}
          />
          <AdminPageButton
            title={"Вопрос-ответ"}
            link={"faq"}
            activePath={activePath}
          />
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
