import ProductDetailsContainsCard from "./ProductDetailsContainsCard";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../store/basketPersistSlice.js";

export default function ProductDetails({ active, product, handleChange }) {
  const isAuthenticated = useSelector(
    (state) => state.userPersist.user.isAuthenticated,
  );
  const basketProducts = useSelector(
    (state) => state.basketPersist.basket.products,
  );
  const dispatch = useDispatch();

  const handleAddProductToCart = function () {
    dispatch(addProduct(product.id));
  };

  return (
    <article
      className={
        (active ? "" : "hidden ") +
        "w-96 sm:w-120 lg:w-[50rem] max-h-[45rem] product-details bg-white fixed left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] z-20 px-12 sm:px-20 md:px-12 py-7 lg:box-content flex flex-col overflow-y-auto rounded-lg"
      }
    >
      <button onClick={handleChange} type="button" className="ml-auto">
        <img className="h-fit" src="/close.png" alt="закрыть подробности" />
      </button>
      <div className="flex flex-col lg:hidden">
        <div className="flex justify-between items-end mt-10">
          <h2 className="product-details__name text-2xl w-7/12 font-semibold">
            {product.name}
          </h2>
          <span>{product.parameter}</span>
        </div>
        <div className="flex flex-col lg:gap-8 items-center lg:mt-12">
          <div className={"flex flex-col items-center gap-6 q lg:gap-8"}>
            <img
              className={"lg:w-96 mt-8 lg:mt-0 sm:w-fit"}
              src={"http://192.168.0.7:3000/" + product.image}
            />
            <p className="text-center">{product.description}</p>
          </div>
          <div className="flex justify-between mt-12 w-full">
            <span className="product-card__price font-semibold text-2xl">
              {product.price} ₽
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
          <button
            onClick={handleChange}
            type="button"
            className="mt-12 lg:hidden"
          >
            Вернуться назад
          </button>
        </div>
      </div>
      <div className="hidden lg:flex lg:gap-28">
        <img
          className={"lg:w-96 mt-8 lg:mt-0 sm:w-10/12 "}
          src={"http://192.168.0.7:3000/" + product.image}
          alt={product.name}
        />
        <div className="w-64">
          <div className="flex justify-between items-end mt-10">
            <h2 className="product-details__name text-2xl w-7/12 font-semibold">
              {product.name}
            </h2>
            <span>{product.parameter}</span>
          </div>
          <div className="flex flex-col lg:gap-8 items-start lg:mt-12">
            <p className="text-left">{product.description}</p>
            <div className="flex justify-between mt-12 w-full">
              <span className="product-card__price font-semibold text-2xl">
                {product.price} ₽
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
            <button
              onClick={handleChange}
              type="button"
              className="mt-12 lg:hidden"
            >
              Вернуться назад
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
