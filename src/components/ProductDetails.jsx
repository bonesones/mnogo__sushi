import ProductDetailsContainsCard from "./ProductDetailsContainsCard";

export default function ProductDetails({ active, data, handleChange }) {
  return (
    <article
      className={
        (active ? "" : "hidden ") +
        "w-96 sm:w-120 lg:w-232 h-160 product-details bg-white fixed left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] z-20 px-12 sm:px-20 md:px-12 py-7 lg:box-content flex flex-col overflow-y-auto rounded-lg"
      }
    >
      <button onClick={handleChange} type="button" className="ml-auto">
        <img className="h-fit" src="/close.png" alt="закрыть подробности" />
      </button>
      <div className="flex justify-between items-end mt-10">
        <h2 className="product-details__name text-2xl w-7/12 font-semibold">
          {data.title}
        </h2>
        <span>{data.weight + " гр."}</span>
      </div>
      <div className="flex flex-col lg:gap-8 items-center lg:mt-12">
        <div className="flex flex-col  lg:flex-row items-center lg:gap-8">
          <img
            className="mt-8 lg:mt-0 h-fit sm:w-10/12 md:w-8/12 lg:w-full lg:h-96"
            src={data.image}
          />
          {data.contains && (
            <div className="flex flex-col items-center w-full lg:h-96">
              <div className="mx-auto mt-12 lg:mt-0 flex flex-col gap-8 overflow-y-auto h-full">
                {data.contains.map(({ name, img, description }, key) => {
                  return (
                    <ProductDetailsContainsCard
                      title={name}
                      image={img}
                      description={description}
                      key={key}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {!data.contains && <p>{data.description}</p>}
        </div>
        <div className="flex justify-between mt-12 w-full">
          <span className="product-card__price font-semibold text-2xl">
            {data.price} ₽
          </span>
          <button className="product-card__cart-btn rounded-lg px-7 font-medium hover:bg-second">
            В корзину
          </button>
        </div>
        <button
          onClick={handleChange}
          type="button"
          className="mt-12 lg:hidden"
        >
          Вернуться назад
        </button>
      </div>
    </article>
  );
}
