import Header from "../components/Header.jsx";
import Slider from "../components/Slider.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import CheckAuth from "../components/CheckAuth.jsx";

export default function MainPage({ setCategory }) {


  return (
    <>
    <CheckAuth>
        <Header />
    </CheckAuth>
      <main className="mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
