import CategoryCard from "../components/CategoryCard"

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

export default function Menu() {
    return (
        <section className="category-list container py-6 grid grid-cols-2 justify-items-center gap-y-5">
                    <CategoryCard title="Наборы" image={Combo} />
                    <CategoryCard title="Пицца" image={Meat} />
                    <CategoryCard title="Сушипицца" image={SushiPizza} />
                    <CategoryCard title="Сливочные роллы" image={CreamRolls} />
                    <CategoryCard title="Маки" image={Maki}/>
                    <CategoryCard title="Холодные роллы" image={ColdRolls}/>
                    <CategoryCard title="Запеченные роллы" image={BakedRolls}/>
                    <CategoryCard title="Теплые роллы" image={HotRolls}/>
                    <CategoryCard title="Закуски" image={Snacks}/>
                    <CategoryCard title="Дополнительно" image={Extras}/>
        </section>
    )
}