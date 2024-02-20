import ProductCard from "../components/ProductCard"

export default function ComboMenu() {
    return (
        <section className="grid grid-col-1 justify-center mt-12 gap-y-32">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </section>
    )
}