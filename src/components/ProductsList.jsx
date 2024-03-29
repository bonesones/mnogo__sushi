import ProductCard from "./ProductCard";
import data from "../data/products.json"
import BackGround from "./BackGround";

export default function ProductsList({ category }) {

    const products = data[category]?.products

    return (
        <section id='products' className="wrapper relative category-products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center mt-12 lg:mt-24 mb-12 gap-y-32">
            {   products ? 
                products.map((product, key) => {
                    console.log(product.weight)
                    return <ProductCard title={product.name}
                                        image={product.img}
                                        description={product.description}
                                        price={product.price}
                                        isSale={product.sale.isSale}
                                        sale={product.sale.sum}
                                        weight={product.weight}
                                        contains={product.contains}
                                        key={key}
                                        isPriceVisible={true}
                                         />
                }) : <div className="text-center w-full text-5xl font-medium absolute">Извините, данной категории продуктов ещё нет</div>
            }
        </section>
    )
}