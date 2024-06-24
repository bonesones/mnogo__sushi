import Header from "../components/Header.jsx";
import Slider from "../components/Slider.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import CheckAuth from "../components/CheckAuth.jsx";

export default function MainPage({ scroll }) {


  return (
    <>
    <CheckAuth>
        <Header />
    </CheckAuth>
      <div className="px-2 py-3 bg-second fixed right-1 bottom-2">
        <img src={"/ArrowScrollTop.svg"} alt={"Перейти вверх"} />
      </div>
      <main className="mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
