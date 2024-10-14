import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Render.module.scss";
import { SetSlugMovie } from "../../contextApi/setSlugMovie";
import IMG from "../../image/IMG";
import Loading from "../loading/Loading";
const Render = ({ title, data }) => {
  const slider = useRef();
  const { setSlug } = useContext(SetSlugMovie);
  const { theme } = useContext(SetSlugMovie);
  const { setTimeload } = useContext(SetSlugMovie);
  const { converLanguage } = useContext(SetSlugMovie);
  function handerBackSlider() {
    const width = slider.current.offsetWidth / 2;
    slider.current.scrollBy({
      left: -width,
      behavior: "smooth",
    });
  }

  function handerNextSlider() {
    const width = slider.current.offsetWidth / 2;
    slider.current.scrollBy({
      left: width,
      behavior: "smooth",
    });
  }
  function handerLoadingAndSlug(par) {
    setSlug(par);
    setTimeload(true);
  }

  return (
    <>
      <p className={style.category}>{title}</p>
      <div className={style.render}>
        <div className={style.tvShows} ref={slider}>
          {data.map((item) => (
            <div className={style.content} key={item.id}>
              <Link to={`/WatchMovie/${item.slug}/${item._id}`}>
                <IMG
                  className={style.poster}
                  src={`https://phimimg.com/${item.poster_url}`}
                  alt={item.name}
                  onClick={() => handerLoadingAndSlug(item.slug)}
                />
              </Link>
              <p className={style.name}>
                {converLanguage ? item.origin_name : item.name}
              </p>
              <span className={style.playI}>
                <i class="fa-solid fa-play"></i>
              </span>
            </div>
          ))}
        </div>
        <span className={style.arrowLeft} onClick={() => handerBackSlider()}>
          <i class="fa-solid fa-arrow-left"></i>
        </span>
        <span className={style.arrowRight} onClick={() => handerNextSlider()}>
          <i class="fa-solid fa-arrow-right"></i>
        </span>
      </div>
    </>
  );
};

export default Render;
