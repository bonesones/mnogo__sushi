
import ProductsList from "../components/ProductsList";
import { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails";
import Slider from "../components/Slider";
import axios from "axios";

export default function Menu({ }) {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(1)

  useEffect(() => {
    const getAllCategories = async function () {
      try {
        const response = await axios.get(`/api/category/getall/`);
        const data = response.data
        setCategories(data)
      } catch (e) {
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
      </div>
      <ProductsList category={category} />
    </>
  );
}
