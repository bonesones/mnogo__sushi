import { useRef, useState } from "react";
import ProductDetails from "./ProductDetails";
import BackGround from "./BackGround";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../store/basketPersistSlice.js";
import ProductDetailsCombo from "./ProductsDetailsCombo.jsx";

export default function ProductCard({ product, isPriceVisible }) {
  const [isProductModalActive, setIsProductModalActive] = useState(false);
  const isAuthenticated = useSelector(
    (state) => state.userPersist.user.isAuthenticated,
  );
  const dispatch = useDispatch();
  const basketProducts = useSelector(
    (state) => state.basketPersist.basket.products,
  );

  const handleOpenCloseProductModal = function () {
    setIsProductModalActive((prev) => !prev);
  };

  const handleAddProductToCart = function () {
    dispatch(addProduct(product.id));
  };

  return (
    <>
      <BackGround
        onClick={handleOpenCloseProductModal}
        active={isProductModalActive}
      />
      <article className={"product-card w-[18rem] flex flex-col justify-between h-[500px]"}>
        <button
          onClick={handleOpenCloseProductModal}
          className="product-card__image w-full mx-auto block relative"
        >
          <img
            className="h-60 mx-auto block object-contain"
            src={import.meta.env.VITE_STATIC_URL + product.image}
            alt=""
          />
          {product.isSale && (
            <span className="product-card__sale absolute w-7/12 py-1 font-semibold text-white text-base pl-5 top-0 right-0">
              скидка {product.sale} ₽
            </span>
          )}
        </button>
        <h3 className="text-center font-medium text-2xl">
          {product.name}
        </h3>
        <p className="product-card__description h-20 sm:h-24">
          {product.description}
        </p>
        <div className="flex justify-between">
          <span className="product-card__price font-semibold text-2xl">
            {product.price.toLocaleString("ru-RU")} ₽
          </span>
          {isAuthenticated ? (
            basketProducts &&
            basketProducts.find(({ id }) => id === product.id) ? (
              <Link
                to="/cart"
                className="product-card__cart-btn bg-second text-white rounded-lg px-7 font-medium"
              >
                Уже в корзине
              </Link>
            ) : (
              <button
                className="product-card__cart-btn text-[#F35E62] rounded-lg px-7 font-medium hover:bg-second"
                onClick={handleAddProductToCart}
              >
                В корзину
              </button>
            )
          ) : (
            <Link
              to="/login"
              className="product-card__cart-btn text-[#F35E62] rounded-lg px-7 font-medium hover:bg-second"
            >
              В корзину
            </Link>
          )}
        </div>
      </article>
      {product.isCombo ? (
        <ProductDetailsCombo
          product={product}
          active={isProductModalActive}
          handleChange={handleOpenCloseProductModal}
        />
      ) : (
        <ProductDetails
          product={product}
          active={isProductModalActive}
          handleChange={handleOpenCloseProductModal}
        />
      )}
    </>
  );
}
