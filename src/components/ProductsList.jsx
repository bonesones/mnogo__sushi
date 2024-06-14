import ProductCard from "./ProductCard";
import data from "../data/products.json";
import BackGround from "./BackGround";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ProductsList({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async function () {
      const response = await axios.get(`/api/product/getall/categoryId/${category}`)
      const data = response.data
      data.sort(({ id: prevId }, { id: nextId }) => nextId - prevId)
      setProducts(data.filter((product) => {
        if(product.isDeleted || product.Sibling?.findIndex(product => product.isDeleted === true) != -1) {
          return false
        }
        return true
      }))
    }
    getProducts()
  }, [category])

  return (
    <section
      id="products"
      className="wrapper mx-auto relative category-products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center mt-12 lg:mt-24 mb-12 gap-y-32"
    >
      {products.length > 0 ? (
        products.map((product) => {
          return (
            <ProductCard
              product={product}
              isPriceVisible={true}
              key={product.id}
            />
          );
        })
      ) : (
        <div className="text-center w-full text-xl font-medium my-20 col-span-1 sm:col-span-2 lg:col-span-3 ">
          Извините, данной категории продуктов ещё нет
        </div>
      )}
    </section>
  );
}
