import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import AdminPageButton from "../components/AdminPageButton.jsx";
import {useEffect, useState} from "react";

export default function AdminPage () {

    const [activeId, setActiveId] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/admin" || location.pathname === "/admin/") {
            navigate("/admin/orders");
        }
    }, []);

    return (
        <div className="wrapper">
            <h1 className="font-semibold text-3xl mt-24 text-center md:text-left">
                Панель администратора
            </h1>
            <nav className="flex justify-center mt-16">
                <ul className="flex flex-col lg:flex-row gap-6">
                    <AdminPageButton title={"Заказы"} link={'/orders'} id={1} activeId={activeId} onClick={setActiveId} />
                    <AdminPageButton title={"Создать товар"} link={'/create_product'} id={2} activeId={activeId} onClick={setActiveId} />
                    <AdminPageButton title={"Заявки обратной связи"} link={'/callbacks'} id={3} activeId={activeId} onClick={setActiveId} />
                    <AdminPageButton title={"Акции"} link={'/promotions'} id={4} activeId={activeId} onClick={setActiveId} />
                    <AdminPageButton title={"Промокоды"} link={'/promocodes'} id={5} activeId={activeId} onClick={setActiveId} />
                    <AdminPageButton title={"Вопрос-ответ"} link={'/faq'} id={6} activeId={activeId} onClick={setActiveId} />
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}