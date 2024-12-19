import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/home.css';
import Slide1 from '../assets/slide1.png';
import Slide2 from '../assets/slide2.png';
import Slide3 from '../assets/slide3.png';

export default function Slider() {
    return (
        <div className="main-slider-container">
            <Swiper
                speed={2500}
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                    '--swiper-navigation-size': '44px',
                    '--swiper-pagination-bullet-inactive-color': '#999',
                    '--swiper-pagination-bullet-inactive-opacity': '0.5'
                }}
                loop={true}
                cssMode={false}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                className="main-swiper"
            >
                <SwiperSlide><img src={Slide1} alt="slider-1" /></SwiperSlide>
                <SwiperSlide><img src={Slide2} alt="slider-2" /></SwiperSlide>
                <SwiperSlide><img src={Slide3} alt="slider-3" /></SwiperSlide>
            </Swiper>
        </div>
    );
}