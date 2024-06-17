import {useEffect, useState} from "react";
import Loading from "../../../components/Loading.jsx";
import Promotion from "./Promotion.jsx";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Promotions () {
    const [promotions, setPromotions] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await axios.get("/api/promotion/getall");
                setPromotions(response.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchPromotions().finally(() => {
            setLoaded(true)
        })
    }, [])

    if(!loaded) return <Loading />

    return (
        <div className="mt-16 mb-16 flex flex-col items-center">
            <h2 className="text-2xl font-semibold">Акции</h2>
            {openModal && (
                <div className="fixed z-10 top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
                    Акция удалена!
                </div>
            )}
            <Link
                to="/admin/promotions/create_promotion"
                className="mt-12 bg-second text-white px-5 py-1 rounded-md"
            >
                Создать акцию
            </Link>
            <div className="flex flex-col md:flex-row md:flex-wrap items-center md:justify-between w-full gap-6 mt-12">
                {
                    promotions.map(promotion => (
                        <Promotion key={promotion.id}  promotion={promotion} setPromotions={setPromotions} setOpenModal={setOpenModal} />
                    ))
                }
            </div>
        </div>
    )
}