import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./NewlyLaunched.css";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import Loading from "./Loading";
function NewlyLaunched(props) {
  const [products, setproducts] = useState(null);
  const [loading, setloading] = useState(true);
  const user = useSelector((state) => state.user.user) || {};

  const token = user.jwtToken;
  const { name, limit, similar, ProductName } = props;
  useEffect(() => {
    axios.get("http://localhost:8080/product/all").then((response) => {
      if (name === "TRENDING") {
        const filterproducts = response.data.filter((product) =>
          product.productSpecification.includes("Popular")
        );
        const limitedproducts = filterproducts.slice(0, limit);
        setproducts(limitedproducts);
        setloading(false);
      } else if (similar && name === "RELATED PRODUCTS") {
        const similarProducts = response.data.filter(
          (product) =>
            product.productCategory === similar &&
            product.productName !== ProductName
        );
        const limitedproducts = similarProducts.slice(0, limit);
        setproducts(limitedproducts);
        setloading(false);
      } else {
        const filterproducts = response.data.filter((product) =>
          product.productSpecification.includes("New Arrival")
        );
        const limitedproducts = filterproducts.slice(0, limit);
        setproducts(limitedproducts);
        setloading(false);
      }
    });
  }, [limit, name, token, similar]);

  if (!products) return null;
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="newlauch">
      <div className="header">
        <span>{name}</span>
      </div>
      <div className="newswiper">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={true}
          modules={[Pagination, Autoplay, Navigation]}
          className="mySwiper"
        >
          {products.map((product, id) => (
            <SwiperSlide key={id}>
              <Card product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default NewlyLaunched;
