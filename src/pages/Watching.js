import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Hls from "hls.js";
import Header from "../components/header/Header";
import { SetSlugMovie } from "../contextApi/setSlugMovie";
import IMG from "../image/IMG";
import Comment from "../components/comment/Comment";
import style from "../stylePages/Watching.module.scss";
import Footer from "../components/footer/Footter";
import Loading from "../components/loading/Loading";
const Watching = () => {
  const { slug } = useContext(SetSlugMovie);
  const [data, setData] = useState([]);
  const [poster, setPoster] = useState("");
  const [episodeFiml, setEpisodeFiml] = useState(0);
  const [id, setID] = useState("");
  const [infor, setInfor] = useState({});
  const [actors, setActors] = useState([]);
  const { timeLoad, setTimeload } = useContext(SetSlugMovie);
  const { converLanguage } = useContext(SetSlugMovie);
  const refHeart = useRef();
  const listHeart = [];
  const listHeartLocal = JSON.parse(localStorage.getItem("listHeart") || "[]");
  listHeartLocal.forEach((item) => listHeart.push(item));
  const itemHeaerts = {
    img: "",
    name: "",
    year: "",
    nation: "",
    episoder: "",
  };
  const url = `https://phimapi.com/phim/${slug}`;
  useEffect(() => {
    const fecthData = async () => {
      const result = await axios.get(url);
      const listFilm = result.data.episodes[0].server_data;
      setActors(result.data.movie.actor);
      setInfor(result.data.movie);
      setPoster(result.data.movie.poster_url);
      setData(listFilm);
    };
    fecthData();
  }, [slug]);

  useEffect(() => {
    const setTimeloading = setTimeout(() => {
      setTimeload(false);
    }, 2000);

    return () => clearTimeout(setTimeloading);
  }, [setTimeload]);

  if (timeLoad) {
    return <Loading />;
  }

  const handleEpisodeClick = (episode, index) => {
    setEpisodeFiml(index);
    setID(episode.id);
  };
  const handlerHeart = () => {
    refHeart.current.style.color = "#FE2C55";
    itemHeaerts.year = infor.year;
    itemHeaerts.name = infor.name;
    itemHeaerts.img = poster;
    itemHeaerts.episoder = infor.episode_current;
    itemHeaerts.nation = infor.country[0]?.name;
    listHeart.push(itemHeaerts);
    localStorage.setItem("listHeart", JSON.stringify(listHeart));
  };
  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.videoContainer}>
          <div>
            <iframe
              src={data[episodeFiml]?.link_embed}
              allowFullScreen
              title="Movie Player"
              className={style.video}
            />
          </div>
        </div>
        <div className={style.listEpisode}>
          <p className={style.title}>
            {converLanguage ? "List of episodes" : "Danh sách tập phim"}
          </p>
          <div className={style.episodes}>
            {data.map((episode, index) => (
              <Link
                key={index}
                to={`/WatchMovie/${infor.name}/${episode.id}`}
                className={style.numberEpisode}
                onClick={() => handleEpisodeClick(episode, index)}
              >
                <p
                  style={
                    index === episodeFiml
                      ? { color: "white" }
                      : { color: "#00DC5A" }
                  }
                >
                  {index + 1}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={style.infors}>
        <div className={style.wraper}>
          <p className={style.name}>
            {`${converLanguage ? infor.origin_name : infor.name} - Tập ${
              episodeFiml + 1
            } - ${infor.time}`}
            <span className={style.heart} ref={refHeart} onClick={handlerHeart}>
              {" "}
              <i class="fa-solid fa-heart"></i>{" "}
            </span>
          </p>
          <p className={style.nation}>
            {converLanguage ? "Nation:" : " Quốc gia:"}
            <span> {infor.country && infor.country[0]?.name} </span>
          </p>
          <p className={style.category}>
            {converLanguage ? "Catelogy:" : " Thể loại:"}

            <span>
              {infor.category && infor.category[0]?.name},{" "}
              {infor.category && infor.category[1]?.name}
            </span>
          </p>
          <p className={style.year}>
            {converLanguage ? "Year of publication:" : "Năm xuất bản:"}

            <span>{infor.year} </span>
          </p>
          <p className={style.content}>
            {converLanguage ? "Describe:" : "Miêu tả:"}

            <span> {infor.content} </span>
          </p>
          <div className={style.actor}>
            <p className={style.title}>
              {" "}
              {converLanguage ? "Actor:" : "Diễn viên:"}
            </p>
            <div className={style.listActor}>
              {actors.map((actor, idx) => (
                <p key={idx} className={style.nameActor}>
                  {actor}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Comment />
      <Footer />
    </>
  );
};

export default Watching;
