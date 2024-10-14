import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import style from "../stylePages/Cartoon.module.scss";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import RenderPage from "../components/renderMovie/RenderPage";
import Loading from "../components/loading/Loading";
import { SetSlugMovie } from "../contextApi/setSlugMovie";
import Footter from "../components/footer/Footter";
const Cartoon = () => {
  const [data, setData] = useState([]);
  const [totalPaga, setTotalPaga] = useState(0);
  const { timeLoad, setTimeload } = useContext(SetSlugMovie);
  const { total } = useContext(SetSlugMovie);
  const { converLanguage } = useContext(SetSlugMovie);
  useEffect(() => {
    const fecthData = async () => {
      try {
        if (total) {
          var result = await axios.get(
            `https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=${total}&limit=40`
          );
        } else {
          var result = await axios.get(
            `https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=1&limit=40`
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
              title={converLanguage ? "Cartoon" : "Hoạt Hình"}
              pages={pages}
              path="Cartoon"
            />
          </div>
        </div>
      )}
      <Footter />
    </>
  );
};

export default Cartoon;
