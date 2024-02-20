import product from "./../assets/cheese.png"


export default function ProductCard({ title,
                                      image , 
                                      description, 
                                      cost, 
                                      isSale }) {
    return (
        <article className="product-card w-72">
            <button className="product-card__image w-full relative">
                <img className="w-full" src={product} />
                <span className="product-card__sale absolute w-7/12 py-1 font-semibold text-white text-base pl-5 absolute top-0 right-0">скидка 500 р</span>
            </button>
            <h3 className="text-center font-medium text-2xl">МногоМяса</h3>
            <p className="product-card__description mt-3">
            Соус, сыр, ветчина, пепперони, мясо, колбаса полукопченная, 30см
            </p>
            <div className="flex justify-between mt-3">
                <span className="product-card__price font-semibold text-2xl">600 ₽</span>
                <button className="product-card__cart-btn rounded-lg px-7 font-medium">
                    В корзину
                </button>
            </div>
        </article>
    )
}