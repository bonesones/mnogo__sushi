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
      {
        scroll > 1200 && (
              <div className="px-5 py-5 rounded-lg bg-second fixed right-9 bottom-16 mix-blend-difference">
                <img src={"/ArrowScrollTop.svg"} className="w-[40px]" alt={"Перейти вверх"}/>
              </div>
          )
      }
      <main className="mx-auto">
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
}
