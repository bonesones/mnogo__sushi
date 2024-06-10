import ProductDetailsContainsCard from "./ProductDetailsContainsCard";

export default function ProductDetails({ active, product, handleChange }) {
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
          {product.name}
        </h2>
        <span>{product.parameter}</span>
      </div>
      <div className="flex flex-col lg:gap-8 items-center lg:mt-12">
        <div className={(product.isCombo ? "lg:flex-row " : "") + "flex flex-col items-center gap-6 q lg:gap-8"}>
          <img
            className={(product.isCombo ? "lg:w-full " : "") + "mt-8 lg:mt-0 h-fit sm:w-10/12 md:w-8/12 lg:h-96"}
            src={"http://192.168.1.156:3000/" + product.image}
          />
          {product.isCombo && (
            <div className="flex flex-col items-center w-full lg:h-96">
              <div className="mx-auto mt-12 lg:mt-0 flex flex-col gap-8 overflow-y-auto h-full">
                {product.Sibling.map(({ id, name, image, description }) => {
                  return (
                    <ProductDetailsContainsCard
                      title={name}
                      image={"http://192.168.1.156:3000/" + image}
                      description={description}
                      key={id}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {!product.isCombo && <p>{product.description}</p>}
        </div>
        <div className="flex justify-between mt-12 w-full">
          <span className="product-card__price font-semibold text-2xl">
            {product.price} ₽
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
