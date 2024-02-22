import ProductCard from "./ProductCard";
import data from "../data/products.json"
import BackGround from "./BackGround";

export default function ProductsList({ category }) {

    const products = data[category].products

    return (
        <section className="category-products grid grid-cols-1 sm:grid-cols-2 place-items-center mt-12 mb-12 gap-y-32">
            {
                products.map((product, key) => {
                    return <ProductCard title={product.name}
                                        image={product.img}
                                        description={product.description}
                                        price={product.price}
                                        isSale={product.sale.isSale}
                                        sale={product.sale.sum}
                                        weight={product.weight}
                                        key={key}
                                        isPriceVisible={true}
                                         />
                })
            }
        </section>
    )
}