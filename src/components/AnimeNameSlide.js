import React from "react";
import "./AnimeNameSlide.css";
import { Link } from "react-router-dom";
const animename = [
  {
    animeName: "One Piece",
    animelogo:
      "https://i.pinimg.com/1200x/43/a6/75/43a675445e2496fa7f3fe9e6a1b88724.jpg",
    image:
      "https://p7.hiclipart.com/preview/711/347/686/roronoa-zoro-zorro-one-piece-anime-one-piece.jpg",
  },
  {
    animeName: "Attack On Titan",
    animelogo:
      "https://cdn.myanimelist.net/r/560x300/s/common/uploaded_files/1447034211-aab06ba43a800bd556307046c37e2b57.png?s=bb8946a530c948be8b9199531b2cafaa",
    image:
      "https://e7.pngegg.com/pngimages/382/786/png-clipart-mikasa-ackerman-attack-on-titan-anime-eren-yeager-model-sheet-anime-manga-fictional-character-thumbnail.png",
  },
  {
    animeName: "Dragon Ball",
    animelogo:
      "https://logos-world.net/wp-content/uploads/2021/02/Dragon-Ball-Logo.png",
    image:
      "https://i.pinimg.com/736x/ad/75/52/ad755247c577b3af12f18cda618cd6bc.jpg",
  },
  {
    animeName: "Demon Slayer",
    animelogo: "https://fontswan.com/wp-content/uploads/Demon-Slayer-Font.webp",
    image:
      "https://i.pinimg.com/originals/45/0e/d1/450ed18852815d894a8f5961ca4d1e94.png",
  },
  {
    animeName: "Naruto",
    animelogo:
      "https://1000logos.net/wp-content/uploads/2020/09/Naruto-Logo.jpg",
    image:
      "https://w7.pngwing.com/pngs/454/700/png-transparent-naruto-uzumaki-sakura-haruno-sasuke-uchiha-kushina-uzumaki-naruto-sasuke-uchiha-fictional-character-cartoon.png",
  },
  {
    animeName: "Jujustu Kaisen",
    animelogo:
      "https://preussinsider.com/wp-content/uploads/2022/03/Screen-Shot-2022-03-25-at-10.47.15-AM-900x373.png",
    image:
      "https://www.citypng.com/public/uploads/preview/hd-sukuna-jujutsu-kaisen-character-png-11660338916rgj9nyjqu6.png",
  },
  {
    animeName: "Tokyo Revengers",
    animelogo:
      "https://i.pinimg.com/736x/b6/41/48/b6414839ee7ff746a762c0e406e8e34e.jpg",
    image: "https://image.pngaaa.com/938/5535938-middle.png",
  },
];

function AnimeNameSlide() {
  return (
    <div className="name-wrapper">
      <div className="header">SHOP BY ANIME</div>
      <div className="animename">
        {animename.map((item, id) => (
          <Link to={"/products/" + item.animeName} key={id}>
            <div className="anime-logo">
              <img
                src={item.animelogo}
                alt="https://i.pinimg.com/1200x/43/a6/75/43a675445e2496fa7f3fe9e6a1b88724.jpg"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AnimeNameSlide;
