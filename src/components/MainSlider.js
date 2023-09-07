import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./MainSlider.css";
import { Link } from "react-router-dom";

const backimages = [
  {
    name: "Shoes",
    banner:
      "https://www.fansarmy.in/cdn/shop/files/Copy_of_Copy_of_Untitled_26.jpg?v=1692963922",
  },
  {
    name: "Tokyo Revengers",
    banner:
      "https://www.kiayaaccessories.com/cdn/shop/files/Kiaya-Home-Page-Banner-01-min.webp?v=1680929585&width=2000",
  },
  {
    name: "Hoodies",
    banner:
      "https://www.fansarmy.in/cdn/shop/files/Copy_of_Copy_of_Untitled_23.jpg?v=1686477725",
  },
  {
    name: "Caps",
    banner:
      "https://www.kiayaaccessories.com/cdn/shop/files/Kiaya-Home-Page-Banner-09.webp?v=1676894942&width=2000",
  },
  {
    name: "Bags",
    banner:
      "https://www.kiayaaccessories.com/cdn/shop/files/Web-banner_2.jpg?v=1685992823&width=2000",
  },
  {
    name: "OverSized-T-Shirts",
    banner:
      "https://www.fansarmy.in/cdn/shop/files/Copy_of_Copy_of_Untitled_22.jpg?v=1683357929",
  },
  {
    name: "OverSized-T-Shirts",
    banner:
      "https://www.fansarmy.in/cdn/shop/files/Copy_of_Copy_of_Untitled_21.jpg?v=1679305970",
  },
];

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
