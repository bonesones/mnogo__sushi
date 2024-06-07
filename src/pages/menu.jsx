import ProductCard from "../components/ProductCard";
import Combo from "../assets/category-images/Combo4.png";
import Meat from "../assets/category-images/Meat.png";
import SushiPizza from "../assets/category-images/sushipizza.png";
import CreamRolls from "../assets/category-images/cream_rolls.png";
import Maki from "../assets/category-images/maki.png";
import ColdRolls from "../assets/category-images/cold_rolls.png";
import BakedRolls from "../assets/category-images/baked_rolls.png";
import HotRolls from "../assets/category-images/hot_rolls.png";
import Snacks from "../assets/category-images/snacks.png";
import Extras from "../assets/category-images/extras.png";
import ProductsList from "../components/ProductsList";
import { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails";
import Slider from "../components/Slider";
import axios from "axios";

export default function Menu() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(1)

  useEffect(() => {
    const getAllCategories = async function () {
      try {
        const response = await axios.get("/api/category/getall");
        const data = response.data
        setCategories(data)
      } catch (e) {
        console.log(e)
      }
    }

    const getAllProducts = async function () {
      try {
        const response = await axios.get("/api/products/getAll")
        const data = response.data
        setProducts(data)
      } catch(e) {
        console.log(e)
      }
    }
    getAllCategories()
  }, [])


  return (
    <>
      <Slider />
      <div
        className="category-list wrapper py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center gap-y-5 md:gap-y-7 font-medium mx-auto lg:text-lg mt-6"
      >
        {categories && categories.map(({id, name}) => {
          return (
              <button
                  className="category-list__btn"
                  key={id}
                  onClick={() => setCategory(id)}
              >
                {name}
              </button>
          )
        })}
        <ProductsList category={category} />
      </div>
    </>
  );
}
