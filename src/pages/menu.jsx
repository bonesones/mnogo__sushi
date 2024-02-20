import CategoryCard from "../components/CategoryCard"
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

export default function Menu() {

    const categories = [["combo", "Комбо", Combo], // ссылка, название, изображение
                        ["pizza", "Пицца", Meat],
                        ["sushipizza", "Сушипицца", SushiPizza],
                        ["cream_rolls", "Сливочные роллы", CreamRolls],
                        ["maki", "Маки", Maki],
                        ["cold_rolls", "Холодные роллы", ColdRolls],
                        ["baked_rolls", "Запеченные роллы", BakedRolls],
                        ["warm_rolls", "Теплые роллы", HotRolls],
                        ["snacks", "Закуски", Snacks],
                        ["additional", "Дополнительно", Extras]
                       ]

    return (
        <>
            <section className="category-list container py-6 grid grid-cols-2 justify-items-center gap-y-5">
                {categories.map(([link, title, image], key) => {
                    return <CategoryCard 
                            title={title} 
                            image={image} 
                            category={link} 
                            key={key} />
                })}
            </section>
            <section id="combo" className="hidden category-products grid grid-col-1 justify-center mt-12 gap-y-32">
                <h1>Combo</h1>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </section>
            <section id="pizza" className="hidden category-products grid grid-col-1 justify-center mt-12 gap-y-32">
                <h1>Pizza</h1>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </section>
        </>
    )
}