import PromoCard from "../components/PromoCard";

export default function Promo() {
  return (
    <div className="promo mx-auto wrapper">
      <h1 className="font-semibold text-3xl mt-24 text-center lg:text-left">
        Акции
      </h1>
      <section className=" mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-x-12 gap-y-8  mb-20">
        <PromoCard
          img="/birthday.png"
          title="С ДНЁМ РОЖДЕНИЯ, ДРУГ!"
          description="Спешим поздравить наших именинников и порадовать их приятными подарком,а именно скидкой 10%"
        />
        <PromoCard
          img="/review.png"
          title="ДАРИМ ТЕПЛЫЙ РОЛЛ С КРАБОМ"
          description="Оставляй фото-отзыв о заказе и получи ролл с крабом в подарок при следующем заказе"
        />
        <PromoCard
          img="/prise.png"
          title="БЫСТРЫЙ РОЗЫГРЫШ!"
          description="Итоги уже сегодня вечером (16.02.2024 г. после 22.00)"
        />
      </section>
    </div>
  );
}
