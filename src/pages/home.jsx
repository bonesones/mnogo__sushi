import Header from "../components/Header";
import Slider from "../components/Slider";
import { Outlet } from "react-router-dom";


export default function Home() {
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