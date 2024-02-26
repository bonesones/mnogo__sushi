import PromoCard from "../components/PromoCard";

export default function Promo() {
    return (
        <>
            <h1 className="font-semibold text-5xl mt-24 wrapper">Акции</h1>
            <section className="te wrapper mt-20 grid grid-cols-3 gap-x-12">
                <PromoCard img="/birthday.png"
                           title="С ДНЁМ РОЖДЕНИЯ, ДРУГ!"
                           description="Спешим поздравить наших именинников и порадовать их приятными подарком,а именно скидкой 10%"
                />
                <PromoCard img="/review.png"
                           title="ДАРИМ ТЕПЛЫЙ РОЛЛ С КРАБОМ"
                           description="Оставляй фото-отзыв о заказе и получи ролл с крабом в подарок при следующем заказе"
                />
                <PromoCard img="/prise.png"
                           title="БЫСТРЫЙ РОЗЫГРЫШ!"
                           description="Итоги уже сегодня вечером (16.02.2024 г. после 22.00)"
                />
            </section>
        </>
    )
}