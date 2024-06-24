import Header from "../components/Header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import CheckAuth from "../components/CheckAuth.jsx";

export default function MainPage(props) {

  const handleGoToTop = function () {
    window.scrollTo(0, 0, { behavior: "smooth" })
  }

  return (
    <>
    <CheckAuth>
        <Header />
    </CheckAuth>
      {
        props.scroll > 1200 && (
              <div className="px-5 py-5 rounded-lg bg-second fixed right-9 bottom-16 mix-blend-color-dodge cursor-pointer z-50" onClick={handleGoToTop}>
                <img src={"/ArrowScrollTop.svg"} className="w-[40px] rotate-180" alt={"Перейти вверх"}/>
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
