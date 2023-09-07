import React, { useEffect } from "react";
import MainSlider from "../components/MainSlider";
import MostInDemand from "../components/MostInDemand";
import AnimeNameSlide from "../components/AnimeNameSlide";
import TrustCard from "../components/TrustCard";
import NewlyLaunched from "../components/NewlyLaunched";
import ReviewHome from "../components/ReviewHome";

function HomePage() {
  useEffect(() => {
    document.title = "Anime Sense";
  }, []);

  return (
    <div>
      <MainSlider />
      <NewlyLaunched name="LATEST DROPS" limit={10} />
      <MostInDemand />
      <NewlyLaunched name="TRENDING" limit={10} />
      <AnimeNameSlide />
      <TrustCard />
      <ReviewHome />
    </div>
  );
}

export default HomePage;
