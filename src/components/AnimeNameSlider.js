import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { shopByAnime } from "./Constants";
import { getSlidesPerView } from "./Utils";
import "./NewlyLaunched.css"
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const AnimeNameSlider = () => {
    let slidesPerViewself = getSlidesPerView(4, 3);
    return (
      <div className="newlauch">
        <div className="newswiper">
          <Swiper
            slidesPerView={slidesPerViewself}
            spaceBetween={5}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={true}
            modules={[Pagination, Autoplay, Navigation]}
            className="mySwiper"
          >
            <div>
            {shopByAnime.map((anime, id) => (
              <SwiperSlide key={id}>
               <img className='animeimage' src={anime.banner} alt={anime.name}/>
              </SwiperSlide>
            ))}
            </div>
          </Swiper>
        </div>
      </div>
    );
}

export default AnimeNameSlider