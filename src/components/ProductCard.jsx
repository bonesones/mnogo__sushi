import { useRef, useState } from "react";
import ProductDetails from "./ProductDetails";
import BackGround from "./BackGround";
import ProductDetailsWithoutContains from "./ProductDetailsWithoutContains";

export default function ProductCard({ title,
                                      image , 
                                      description, 
                                      price, 
                                      isSale,
                                      sale,
                                      contains,
                                      weight,
                                      isPriceVisible,
                                      }) {
                        
    const data = {
        title,
        description,
        image,
        weight,
        contains,
        price
    }

    const [isProductModalActive, setIsProductModalActive] = useState(false)

    const handleOpenCloseProductModal = function() {
        if(!isProductModalActive) {
            document.body.className = "overflow-hidden"
        } else {
            document.body.className = ""
        }
        setIsProductModalActive(prev => !prev)
    }


    return (
        <>
            <BackGround onClick={handleOpenCloseProductModal} active={isProductModalActive} />
            <article className={"product-card w-72"}>
                <button onClick={handleOpenCloseProductModal} className="product-card__image w-full relative">
                    <img className="w-full h-60" src={image} />
                    {isSale && <span className="product-card__sale absolute w-7/12 py-1 font-semibold text-white text-base pl-5 absolute top-0 right-0">
                        скидка {sale} ₽
                    </span>}
                </button>
                <h3 className="text-center font-medium text-2xl">{title}</h3>
                <p className="product-card__description mt-3 h-20 sm:h-24">
                    {description}
                </p>
                <div className={(isPriceVisible ? "" : "hidden ") + " flex justify-between"}>
                    <span className="product-card__price font-semibold text-2xl">{price} ₽</span>
                    <button className="product-card__cart-btn rounded-lg px-7 font-medium hover:bg-second">
                        В корзину
                    </button>
                </div>
            </article>
            {data.contains && <ProductDetails data={data} active={isProductModalActive} handleChange={handleOpenCloseProductModal} />}
            {!data.contains && <ProductDetailsWithoutContains data={data} active={isProductModalActive} handleChange={handleOpenCloseProductModal} />}
        </>
    )
}