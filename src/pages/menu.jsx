
import ProductCard from "../components/ProductCard"
import Combo from "../assets/category-images/Combo4.png"
import Meat from "../assets/category-images/Meat.png"
import SushiPizza from "../assets/category-images/sushipizza.png"
import CreamRolls from "../assets/category-images/cream_rolls.png"
import Maki from "../assets/category-images/maki.png"
import ColdRolls from "../assets/category-images/cold_rolls.png"
import BakedRolls from "../assets/category-images/baked_rolls.png"
import HotRolls from "../assets/category-images/hot_rolls.png"
import Snacks from "../assets/category-images/snacks.png"
import Extras from "../assets/category-images/extras.png"
import ProductsList from "../components/ProductsList"
import { useEffect, useState } from "react"
import ProductDetails from "../components/ProductDetails"


export default function Menu({ category, setCategory }) {

    const [isModalActive, setIsModalActive] = useState(false)
    const [isFirstRender, setIsFirstRender] = useState(true)


    useEffect(() => {
        if(!isFirstRender) {
            document.querySelector('.category-list__btn_active')?.classList?.remove('category-list__btn_active')
            document.querySelector(`[data-id='${category}'`).classList.add('category-list__btn_active')
        } else {
            setIsFirstRender(false)
        }
        
    }, [category])

    const handleChangeCategory = function (e) {
        setCategory(e.target.getAttribute('data-id'))
    }

    return (
        <> 
            <div className="category-list wrapper py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center gap-y-5 md:gap-y-7 font-medium mx-auto lg:text-lg mt-6"
                 onClick={(e) => handleChangeCategory(e)}>
                <button className="category-list__btn category-list__btn_active" data-id="combo">Наборы</button>
                <button className="category-list__btn" data-id="pizza">Пицца</button>
                <button className="category-list__btn" data-id="sushipizza">Сушипицца</button>
                <button className="category-list__btn" data-id="cream_rolls">Сливочные роллы</button>
                <button className="category-list__btn" data-id="maki">Маки</button>
                <button className="category-list__btn" data-id="cold_rolls">Холодные роллы</button>
                <button className="category-list__btn" data-id="baked_rolls">Запеченные роллы</button>
                <button className="category-list__btn" data-id="warm_rolls">Теплые роллы</button>
                <button className="category-list__btn" data-id="snacks">Закуски</button>
                <button className="category-list__btn" data-id="additional">Дополнительно</button>
            </div>
            <ProductsList category={category} />
        </>
    )
}