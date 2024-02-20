export default function ProductCard({ title,
                                      image , 
                                      description, 
                                      price, 
                                      isSale,
                                      sale }) {
    return (
        <article className="product-card w-72">
            <button className="product-card__image w-full relative">
                <img className="w-full" src={image} />
                {isSale && <span className="product-card__sale absolute w-7/12 py-1 font-semibold text-white text-base pl-5 absolute top-0 right-0">
                    скидка {sale} ₽
                </span>}
            </button>
            <h3 className="text-center font-medium text-2xl">{title}</h3>
            <p className="product-card__description mt-3">
                {description}
            </p>
            <div className="flex justify-between mt-8">
                <span className="product-card__price font-semibold text-2xl">{price} ₽</span>
                <button className="product-card__cart-btn rounded-lg px-7 font-medium">
                    В корзину
                </button>
            </div>
        </article>
    )
}