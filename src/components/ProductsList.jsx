import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api.js";
import Loading from "./Loading.jsx";

export default function ProductsList({ category }) {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getProducts = async function () {
      const response = await api.get(
        `/api/product/getall/categoryId/${category}`,
      );
      const data = response.data;
      data.sort(({ id: prevId }, { id: nextId }) => nextId - prevId);
      setProducts(
        data.filter((product) => {
          if (
            product.isDeleted ||
            product.Sibling?.findIndex(
              (product) => product.isDeleted === true,
            ) != -1
          ) {
            return false;
          }
          return true;
        }),
      );
    };
    getProducts().finally(() => {
      setLoaded(true)
    });
  }, [category]);

  if(!loaded) return <Loading />

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
