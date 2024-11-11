import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./MainSlider.css";
import { Link } from "react-router-dom";
import { backimages } from "./Constants";

function MainSlider() {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {backimages.map((item, id) => (
          <SwiperSlide key={id}>
            <Link to={"/products/" + item.name}>
              <img src={item.banner} key={item.name} alt={id} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MainSlider;
