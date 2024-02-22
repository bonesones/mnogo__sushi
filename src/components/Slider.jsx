import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/pagination';
import 'swiper/css'
import { Pagination } from 'swiper/modules';
import Slide1 from "./../assets/bg-slide-1.png"
import Combo7 from "./../assets/Combo7.png"

export default function Slider() {
    return (
        <Swiper pagination={window.innerWidth > 700 ? true : false} modules={[Pagination]} className="mySwiper w-full">
            <SwiperSlide className='relative'>
              <picture>
                <source media='(min-width: 500px)' srcSet='/slider/tablet_slider-1.png' />
                <img className='w-full' src='/slider/mobile_slider-1.png' alt='Сет 60 штук' />
              </picture>
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
    )
}