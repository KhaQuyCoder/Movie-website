import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./MainSlide.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import IMG from "../../image/IMG";
import { SetSlugMovie } from "../../contextApi/setSlugMovie";
const MainSlide = () => {
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([]);
  const sliderRef = useRef();
  const intervalRef = useRef(null);
  const idSetTimeout = useRef(null);
  const isAutoSliding = useRef(true);
  const { setSlug } = useContext(SetSlugMovie);
  const { converLanguage } = useContext(SetSlugMovie);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1"
        );
        setItems(res.data.items);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 8000);
    isAutoSliding.current = true;
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isAutoSliding.current = false;
  };

  useEffect(() => {
    if (items.length > 0) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [items.length]);

  useEffect(() => {
    if (sliderRef.current) {
      const width = sliderRef.current.offsetWidth;
      sliderRef.current.style.transform = `translateX(-${width * index}px)`;
      sliderRef.current.style.transition = "transform 0.5s ease-in-out";
    }
  }, [index]);

  const reset = () => {
    if (idSetTimeout.current) {
      clearTimeout(idSetTimeout.current);
    }
    stopAutoSlide();
    idSetTimeout.current = setTimeout(() => {
      startAutoSlide();
    }, 10000);
  };

  const handleNextSlide = () => {
    reset();
    setIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBackSlide = () => {
    reset();
    setIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={style.container}>
      <div className={style.slider} ref={sliderRef}>
        {items.map((item, idx) => (
          <div key={idx} className={style.wraper}>
            <Link
              className={style.main}
              to={`/WatchMovie/${item.slug}/${item._id}`}
            >
              <IMG
                className={style.thumb}
                src={item.thumb_url}
                alt={item.name}
                onClick={() => setSlug(item.slug)}
              />
              <div className={style.content}>
                <h1>{converLanguage ? item.origin_name : item.name}</h1>
                <p className={style.year}>{item.year}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className={style.nextSlide} onClick={handleNextSlide}>
        <i className="fa-solid fa-arrow-right"></i>
      </div>
      <div className={style.backSlide} onClick={handleBackSlide}>
        <i className="fa-solid fa-arrow-left"></i>
      </div>
    </div>
  );
};

export default MainSlide;
