import { useRef, useState } from "react";
import ProductDetails from "./ProductDetails";
import BackGround from "./BackGround";
import ProductDetailsWithoutContains from "./ProductDetailsWithoutContains";

export default function ProductCard({ product, isPriceVisible }) {

  const [isProductModalActive, setIsProductModalActive] = useState(false);

  const handleOpenCloseProductModal = function () {
    setIsProductModalActive((prev) => !prev);
  };

  return (
    <>
      <BackGround
        onClick={handleOpenCloseProductModal}
        active={isProductModalActive}
      />
      <article className={"product-card w-[18rem]"}>
        <button
          onClick={handleOpenCloseProductModal}
          className="product-card__image w-full mx-auto block relative"
        >
          <img className="h-60 mx-auto block" src={"http://192.168.1.156:3000/" + product.image} alt="" />
          {product.isSale && (
            <span className="product-card__sale absolute w-7/12 py-1 font-semibold text-white text-base pl-5 top-0 right-0">
              скидка {product.sale} ₽
            </span>
          )}
        </button>
        <h3 className="text-center font-medium text-2xl mt-3">{product.name}</h3>
        <p className="product-card__description mt-4 h-20 sm:h-24">
          {product.description}
        </p>
        <div
          className='flex justify-between'
        >
          <span className="product-card__price font-semibold text-2xl">
            {product.price} ₽
          </span>
          <button className="product-card__cart-btn rounded-lg px-7 font-medium hover:bg-second">
            В корзину`
          </button>
        </div>
      </article>
        <ProductDetails
          product={product}
          active={isProductModalActive}
          handleChange={handleOpenCloseProductModal}
        />
    </>
  );
}
