import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./MainSlider.css";
import { Link } from "react-router-dom";
import { mobilescreenImages } from "./Constants";
import { getSlidesPerView } from "./Utils";
const MobileScreenMainSilder = () => {
  let slidesPerViewself = getSlidesPerView(3, 1);
  return (
    <div>
      <Swiper
        slidesPerView={slidesPerViewself}
        spaceBetween={10}
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
        {mobilescreenImages.map((item, id) => (
          <SwiperSlide key={id}>
            <Link to={"/products/" + item.name}>
              <img src={item.banner} key={item.name} alt={id} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MobileScreenMainSilder;
