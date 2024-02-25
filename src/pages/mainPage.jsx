import Header from "../components/Header";
import Slider from "../components/Slider";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";


export default function MainPage({ setCategory }) {


    const handleChangeCategory = function (e) {
        document.querySelector('.category-list__btn_active')?.classList?.remove('category-list__btn_active')
        e.target.classList.add('category-list__btn_active')
        setCategory(e.target.getAttribute('data-id'))
    }

    return (
        <>
            <Header />
            <Slider />
            <main>
                <Outlet />
            </main>
            <Footer />

        </>
    )
}