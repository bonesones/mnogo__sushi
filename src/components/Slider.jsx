import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/pagination';
import 'swiper/css'
import { Pagination } from 'swiper/modules';
import Slide1 from "./../assets/bg-slide-1.png"
import Combo7 from "./../assets/Combo7.png"

export default function Slider() {
    return (
        <Swiper pagination={window.innerWidth > 700 ? true : false} modules={[Pagination]} className="mySwiper w-full h-44">
            <SwiperSlide className='relative'>
                <img className='slider__slide-bg w-full h-44 object-cover absolute z-0' src={Slide1} />
                <div className='slider-content flex items-center h-full justify-center gap-3'>
                    <div className='slider-info relative z-10 text-white font-semibold'>
                        <h2 className='slider-title text-xl'>Сет 60 штук</h2>
                        <p className='slider-description text-base'> всего за 999 ₽</p>
                    </div>
                    <img className='w-5/12 relative z-10 h-28' src={Combo7} />
                </div>
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
    )
}