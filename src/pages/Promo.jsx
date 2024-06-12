import PromoCard from "../components/PromoCard";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../components/Loading.jsx";

export default function Promo() {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPromotions = async() => {
            try {
                const response = await axios.get("/api/promotion/getall");
                if(response.error) {
                    throw new Error(response.payload.response.status);
                }
                setPromotions(response.data);
                setLoading(false)
            } catch(e) {
                if(e !== 500) {
                    setLoading(false)
                }
            }
        }
        fetchPromotions();
    }, [])

    if(loading) return <Loading />

  return (
    <div className="promo mx-auto wrapper">
      <h1 className="font-semibold text-3xl mt-24 text-center lg:text-left">
        Акции
      </h1>
      <section className=" mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-x-12 gap-y-8  mb-20">
          {
              promotions.length > 0 ? (
                  promotions.map((promotion) => (
                      <PromoCard
                          img={"http://192.168.1.156:3000/" + promotion.image}
                          title={promotion.title}
                          description={promotion.description}
                          key={promotion.id}
                      />
                  ))
              ) : (
                  <h2 className="text-lg mt-4 md:text-center col-span-3">На данный момент акции отсутствуют</h2>
              )
          }
          {/*
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
          */}
      </section>
    </div>
  );
}
