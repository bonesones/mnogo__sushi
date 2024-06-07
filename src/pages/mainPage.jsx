import Header from "../components/Header";
import Slider from "../components/Slider";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import CheckAuth from "../components/CheckAuth.jsx";

export default function MainPage({ setCategory }) {
  const handleChangeCategory = function (e) {
    const categories = document.querySelector(".category-list");
    categories
      .querySelector(".category-list__btn_active")
      ?.classList?.remove("category-list__btn_active");
    categories
      .querySelector("[data-id=" + e.target.dataset.id + "]")
      .add("category-list__btn_active");
    setCategory(e.target.getAttribute("data-id"));
  };

  return (
    <>
    <CheckAuth>
        <Header setCategory={setCategory} />
    </CheckAuth>
      <main className="mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
