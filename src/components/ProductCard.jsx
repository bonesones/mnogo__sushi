import ProductDetails from "./ProductDetails";

export default function ProductCard({ title,
                                      image , 
                                      description, 
                                      price, 
                                      isSale,
                                      sale,
                                      contains,
                                      weight,
                                      isPriceVisible }) {
                        
    const data = {
        title,
        description,
        image,
        weight,
        contains
    }

    return (
        <>
            <article className="product-card w-72">
                <button className="product-card__image w-full relative">
                    <img className="w-full h-60" src={image} />
                    {isSale && <span className="product-card__sale absolute w-7/12 py-1 font-semibold text-white text-base pl-5 absolute top-0 right-0">
                        скидка {sale} ₽
                    </span>}
                </button>
                <h3 className="text-center font-medium text-2xl">{title}</h3>
                <p className="product-card__description mt-3 h-20 sm:h-24">
                    {description}
                </p>
                <div className={isPriceVisible ? "" : "hidden" + " flex justify-between"}>
                    <span className="product-card__price font-semibold text-2xl">{price} ₽</span>
                    <button className="product-card__cart-btn rounded-lg px-7 font-medium hover:bg-second">
                        В корзину
                    </button>
                </div>
            </article>
            <ProductDetails data={data} />
        </>
    )
}