import Header from "../components/Header";
import Slider from "../components/Slider";
import { Outlet } from "react-router-dom";


export default function MainPage() {
    return (
        <>
            <Header />
            <Slider />
            <main>
                <Outlet />
            </main>

        </>
    )
}