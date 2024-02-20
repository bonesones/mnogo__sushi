import ProductCard from "./ProductCard";
import data from "../data/products.json"

export default function ProductsList({ category }) {

    const products = data[category].products

    return (
        <section className="category-products grid grid-col-1 justify-center mt-12 gap-y-32">
            {
                products.map((product, key) => {
                    return <ProductCard title={product.name}
                                        image={product.img}
                                        description={product.description}
                                        price={product.price}
                                        isSale={product.sale.isSale}
                                        sale={product.sale.sum}
                                        key={key} />
                })
            }
        </section>
    )
}