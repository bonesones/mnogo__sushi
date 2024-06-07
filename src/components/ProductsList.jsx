import ProductCard from "./ProductCard";
import data from "../data/products.json";
import BackGround from "./BackGround";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ProductsList({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log(category);
    const getProducts = async function () {
      const response = await axios.get(`/api/product/getall/categoryId/${category}`)
      const data = response.data
      console.log(data)
      setProducts(data)
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
              title={product.name}
              image={"http://192.168.0.6:3000/" + product.image}
              description={product.description}
              price={product.price}
              parameter={product.parameter}
              key={product.id}
              isPriceVisible={true}
            />
          );
        })
      ) : (
        <div className="text-center w-full text-xl font-medium absolute">
          Извините, данной категории продуктов ещё нет
        </div>
      )}
    </section>
  );
}
