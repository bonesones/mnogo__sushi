import { Link } from "react-router-dom";


export default function CategoryCard({ image, title }) {
    return (
        <Link to={"/" + "combo"} className="category-card w-40 h-44 bg-second flex items-center justify-center text-center relative rounded-lg" >
            <img className="category-card__image opacity-70 h-full" src={image} />
            <h3 className="category-card__title text-white font-semibold absolute text-lg.">
                {title}
            </h3>
        </Link>
    )
}