import ProductDetailsContainsCard from "./ProductDetailsContainsCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProductDetailsCombo({ active, product, handleChange }) {
  const isAuthenticated = useSelector(
    (state) => state.userPersist.user.isAuthenticated,
  );
  return (
    <article
      className={
        (active ? "" : "hidden ") +
        "w-96 sm:w-120 lg:w-[60rem] max-h-[45rem] product-details bg-white fixed left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] z-20 px-12 sm:px-20 md:px-12 py-7 lg:box-content flex flex-col overflow-y-auto rounded-lg"
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
          <div className="lg:flex-row flex flex-col items-center gap-6 q lg:gap-8">
            <img
              className={"lg:h-fit mt-8 lg:mt-0 sm:w-fit"}
              src={product.image}
              alt={product.name}
            />
            <div className="flex flex-col items-center w-full lg:h-96">
              <div className="mx-auto mt-12 lg:mt-0 flex flex-col gap-8 overflow-y-auto h-full">
                {product.Sibling.map(({ id, name, image, description }) => {
                  return (
                    <ProductDetailsContainsCard
                      title={name}
                      image={image}
                      description={description}
                      key={id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-12 w-full">
            <span className="product-card__price font-semibold text-2xl">
              {product.price} ₽
            </span>
            {isAuthenticated ? (
              <button className="product-card__cart-btn rounded-lg px-7 font-medium hover:bg-second">
                В корзину
              </button>
            ) : (
              <Link
                to="/login"
                className="product-card__cart-btn rounded-lg px-7 font-medium hover:bg-second"
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
      <div className="hidden lg:grid grid-cols-8 items-center">
        <div className="flex justify-between col-span-8 items-end mt-10">
          <h2 className="product-details__name text-2xl w-7/12 font-semibold">
            {product.name}
          </h2>
          <span>{product.parameter}</span>
        </div>
        <img
          className={"mt-8 lg:mt-0 w-[40rem] col-span-4"}
          src={product.image}
        />
        <div className="col-span-4 ml-10 max-w[430px]">
          <div className="flex flex-col gap-8 items-start lg:mt-12">
            <div
              className={"flex-row flex flex-col items-center gap-6 q lg:gap-8"}
            >
              <div className="flex flex-col items-center w-full lg:h-96">
                <div className="mx-auto mt-12 lg:mt-0 flex flex-col gap-8 overflow-y-auto h-full">
                  {product.Sibling.map(({ id, name, image, description }) => {
                    return (
                      <ProductDetailsContainsCard
                        title={name}
                        image={import.meta.env.VITE_API_URL + image}
                        description={description}
                        key={id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex col-span-8 justify-end gap-6 mt-12 w-full">
          <span className="product-card__price font-semibold text-2xl">
            {product.price} ₽
          </span>
          {isAuthenticated ? (
            <button className="product-card__cart-btn rounded-lg px-7 font-medium hover:bg-second">
              В корзину
            </button>
          ) : (
            <Link
              to="/login"
              className="product-card__cart-btn rounded-lg px-7 font-medium hover:bg-second"
            >
              В корзину
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
