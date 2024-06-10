
export default function ComboConsistsProduct({
                                                       title,
                                                       image,
                                                       description,
                                                   }) {
    return (
        <>
            <article className="product-card w-60 md:w-full flex flex-col lg:flex-row lg:gap-2 items-center">
                <img
                    className="w-10/12 mb-3 h-30 md:w-6/12 md:h-44 product-card__image"
                    src={image}
                />
                <div className="w-[12rem]">
                    <h3 className="text-center lg:text-start font-medium text-xl">
                        {title}
                    </h3>
                    <p className="product-card__description text-center mt-3 h-20 sm:h-24">
                        {description}
                    </p>
                </div>
            </article>
        </>
    );
}
