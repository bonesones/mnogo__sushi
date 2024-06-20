import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Slider() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const response = await api.get("/api/slider/getall");
        setSlides(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSlider();
  }, []);

  if (slides.length === 0) return null;

  return (
    <Swiper
      pagination={window.innerWidth > 700}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      className="mySwiper w-full max-w-[1920px] max-h-[500px]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <picture>
            <source
              media="(min-width: 1100px)"
              className="max-h-[500px]"
              srcSet={slide.desktop_image}
            />
            <img
              className="w-full max-h-[500px]"
              src={slide.tablet_phone_image}
              alt={slide.title}
            />
          </picture>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
