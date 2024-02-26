export default function PromoCard({title, img, description}) {
    return (
        <article className="flex flex-col gap-5 w-96">
                    <img src={img} />
                    <h2 className="text-2xl font-semibold text-center">{title}</h2>
                    <p className="text-center">
                        {description}
                    </p>
        </article>
    )
}