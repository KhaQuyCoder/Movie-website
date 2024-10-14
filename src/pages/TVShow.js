import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header/Header";
import style from "../stylePages/Series.module.scss";
import RenderPage from "../components/renderMovie/RenderPage";
import Loading from "../components/loading/Loading";
import { SetSlugMovie } from "../contextApi/setSlugMovie";
import Footter from "../components/footer/Footter";
const TVShow = () => {
  const [data, setData] = useState([]);
  const [totalPaga, setTotalPaga] = useState(0);
  const { timeLoad, setTimeload } = useContext(SetSlugMovie);
  const { total } = useContext(SetSlugMovie);
  useEffect(() => {
    const fecthData = async () => {
      try {
        if (total) {
          var result = await axios.get(
            `https://phimapi.com/v1/api/danh-sach/tv-shows?page=${total}&limit=40`
          );
        } else {
          var result = await axios.get(
            `https://phimapi.com/v1/api/danh-sach/tv-shows?page=1&limit=40`
          );
        }
        if (result) {
          setTotalPaga(result.data.data.params.pagination.totalPages);
          setData(result.data.data.items);
        }
      } catch (error) {
        alert(error);
      }
    };
    fecthData();
  }, [total]);
  useEffect(() => {
    const setTimeLoading = setTimeout(() => {
      setTimeload(false);
    }, 1000);
    return () => clearTimeout(setTimeLoading);
  });

  if (timeLoad) {
    return <Loading />;
  }
  const pages = Array.from({ length: totalPaga }, (_, i) => i + 1);
  return (
    <>
      <Header />
      {timeLoad === false && (
        <div className={style.cartoon}>
          <div className={style.container}>
            <RenderPage
              thumb={true}
              data={data}
              title="Tv-Shows"
              pages={pages}
              path="Tv-Shows"
            />
          </div>
        </div>
      )}
      <Footter />
    </>
  );
};

export default TVShow;
