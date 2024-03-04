export default function Delivery() {
    return (
        <>
            <h1 className="font-semibold text-5xl mt-24 wrapper">Доставка</h1>
            <section className="wrapper">
                <p className="font-semibold text-3xl my-24">БЕСПЛАТНАЯ ДОСТАВКА ПО ГОРОДУ ОТ 500 РУБЛЕЙ!</p>
                <p className="font-semibold text-2xl">Условия доставки для отдаленных от точки производства районов и населенных пунктов*:</p>
                <div className="flex my-12 text-white text-center items-start gap-16">
                    <p className="font-medium text-xl rounded-xl p-6 bg-[#F35E62] w-[30rem] h-48">
                        Лоста, Харачево, Станкозавод, Прилуки, Рубцово, Ватланово, Емельяново, Родионцево, ул. Клубова, ул. 
                        Элеваторная, Баранково, Ананьино – стоимость доставки 50 рублей.</p>
                    <p className="flex items-center font-medium text-xl rounded-xl p-6 bg-[#F35E62] w-[30rem] h-48">Лукьяново, Кувшиново, Семенково, Дорожный, Непотягово, –стоимость доставки 100 рублей</p>
                </div>
                <p className="font-medium text-xl mb-12">Более подробную информацию Вы можете уточнить у Администратора службы доставки.</p>
                <p className="font-medium text-xl">*Доставка в отдаленные районы может быть ограничена при плотном потоке заказов.</p>
            </section>
        </>
    )
}