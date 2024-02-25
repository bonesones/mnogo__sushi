export default function ProductDetailsWithoutContains({ active, data, handleChange }) {
    return (
        <article className={(active ? "" : "hidden ") + "w-96 sm:w-120 lg:w-152 content-box h-168 lg:h-140 sm:h-160 product-details fixed z-20 px-12 sm:px-20 md:px-12 py-7 lg:box-content flex flex-col overflow-y-auto rounded-md"}>
                <button onClick={handleChange} type="button" className="ml-auto">
                    <img className="h-fit" src="/close.png" alt="закрыть подробности" />
                </button>
                <div className="flex justify-between items-end mt-10 lg:mt-6">
                    <h2 className="product-details__name text-2xl w-7/12 font-semibold">
                        {data.title}
                    </h2>
                    <span>{data.weight + " гр."}</span>
                </div>
                <div className="flex flex-col lg:gap-8 items-center lg:mt-12">
                    <div className="flex flex-col items-center lg:gap-8">
                        <img className="mt-8 lg:mt-0 h-fit sm:w-10/12 md:w-8/12 lg:w-64 lg:h-64" src={data.image} />
                        <p className="mt-5">{data.description}</p>
                    </div>
                    <div className="flex justify-between mt-12 lg:mt-6 w-full">
                        <span className="product-card__price font-semibold text-2xl">{data.price} ₽</span>
                        <button className="product-card__cart-btn rounded-lg px-7 font-medium hover:bg-second">
                            В корзину
                        </button>
                    </div>
                    <button onClick={handleChange} type="button" className="mt-12 lg:hidden">
                        Вернуться назад
                    </button>
                </div>
            </article>
    )
}