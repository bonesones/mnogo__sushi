import { Link } from "react-router-dom";


export default function CategoryCard({ image, title, category, isCategoryOpened }) {

    const openCategory = function() {

        const categoryProducts = document.querySelectorAll('.category-products')
        categoryProducts.forEach((categoryName) => {
            console.log(categoryName.id, category)
            if(categoryName.id === category) {
                categoryName.classList.remove('hidden')
            } else if (!categoryName.classList.contains('hidden'))  {
                categoryName.classList.add('hidden')
            }
        })

        setIsCategoryOpened(prev => !prev)
    }

    return (
        <button className="category-card w-40 h-44 bg-second flex items-center justify-center text-center relative rounded-lg"
                onClick={openCategory} >
            <img className="category-card__image opacity-70 h-full" src={image} />
            <h3 className="category-card__title text-white font-semibold absolute text-lg.">
                {title}
            </h3>
        </button>
    )
}