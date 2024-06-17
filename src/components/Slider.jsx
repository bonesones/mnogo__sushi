import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import { Pagination } from "swiper/modules";
import Slide1 from "./../assets/bg-slide-1.png";
import Combo7 from "./../assets/Combo7.png";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Slider() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const response = await axios.get("/api/slider/getall");
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
      pagination={window.innerWidth > 700 ? true : false}
      modules={[Pagination]}
      className="mySwiper w-full max-w-[1920px] max-h-[500px]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <picture>
            <source
              media="(min-width: 1100px)"
              className="max-h-[500px]"
              srcSet={import.meta.env.VITE_API_URL + slide.desktop_image}
            />
            <img
              className="w-full max-h-[500px]"
              src={import.meta.env.VITE_API_URL + slide.tablet_phone_image}
              alt={slide.title}
            />
          </picture>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
