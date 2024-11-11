import React, { useEffect, useState } from "react";
import MainSlider from "../components/MainSlider";
import MobileScreenMainSilder from "../components/MobileScreenMainSilder";
import MostInDemand from "../components/MostInDemand";
import AnimeNameSlide from "../components/AnimeNameSlide";
import TrustCard from "../components/TrustCard";
import NewlyLaunched from "../components/NewlyLaunched";
import ReviewHome from "../components/ReviewHome";

function HomePage() {
  const [isMobileScreen, setIsMobileScreen] = useState(
    window.innerWidth <= 768
  );
  useEffect(() => {
    document.title = "Anime Sense";
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileScreen]);

  return (
    <div>
      {isMobileScreen ? <MobileScreenMainSilder /> : <MainSlider />}
      <NewlyLaunched name="Latest Drops" limit={10} />
      {isMobileScreen ? <MainSlider /> : <MobileScreenMainSilder />}
      <MostInDemand />
      <NewlyLaunched name="Trending" limit={10} />
      <AnimeNameSlide />
      {/* <TrustCard /> */}
      <ReviewHome />
    </div>
  );
}

export default HomePage;
