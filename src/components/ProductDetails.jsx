import ProductCard from "./ProductCard";
import data from "./../data/products.json"
import BackGround from "./BackGround";
import { useRef, useState } from "react";

export default function ProductDetails({ active, data }){

    const [isBackgroundActive, setIsBackgroundActive] = useState(false)

    const backgroundRef = useRef(null)

    const handleOpenCloseProductModal = function() {
        setIsBackgroundActive(prev => !prev)
    }
    
    return(
        <>
            <article className="w-96 h-160 product-details absolute z-20 px-12 sm:px-20 py-7 flex flex-col overflow-y-auto rounded-md">
                <button type="button" className="ml-auto">
                    <img src="/close.png" alt="закрыть подробности" />
                </button>
                <div className="flex justify-between items-end mt-10">
                    <h2 className="product-details__name text-2xl font-semibold">
                        {data.name}
                    </h2>
                    <span>{data.weight + " гр."}</span>
                </div>
                <img className="mt-8" src={data.image} />
                <p className="mt-7 hidden">
                    {data.description}
                </p>
                <div className="mx-auto mt-24">
                    {
                        data.contains.map(({ name, img, description }, key) => {
                            return (
                                <ProductCard title={name}
                                image={img}
                                description={description}
                                isPriceVisible={false} 
                                key={key} />
                            )
                        })
                    }
                </div>
                <div className="flex justify-between mt-12">
                    <span className="product-card__price font-semibold text-2xl">600 ₽</span>
                    <button className="product-card__cart-btn rounded-lg px-7 font-medium hover:bg-second">
                        В корзину
                    </button>
                </div>
                <button type="button" className="mt-12">
                    Вернуться назад
                </button>
            </article>
        </>
    )
}