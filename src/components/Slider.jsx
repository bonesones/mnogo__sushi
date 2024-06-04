import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import { Pagination } from "swiper/modules";
import Slide1 from "./../assets/bg-slide-1.png";
import Combo7 from "./../assets/Combo7.png";

export default function Slider() {
  return (
    <Swiper
      pagination={window.innerWidth > 700 ? true : false}
      modules={[Pagination]}
      className="mySwiper w-full max-w-[1920px]"
    >
      <SwiperSlide>
        <picture>
          <source
            media="(min-width: 1100px)"
            srcSet="/slider/desktop_slider-1.png"
          />
          <img
            className="w-full"
            src="/slider/tablet_slider-1.png"
            alt="Сет 60 штук"
          />
        </picture>
      </SwiperSlide>
      <SwiperSlide>
        <picture>
          <img
            className="w-full"
            src="/slider/desktop_slider-2.png"
            alt="Сет 60 штук"
          />
        </picture>
      </SwiperSlide>
    </Swiper>
  );
}
