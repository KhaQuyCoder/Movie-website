import { useEffect, useContext, useState } from "react";
import Render from "../components/renderMovie/Render";
import { ContextApi } from "../fetchApi/FetchApi";

import Loading from "../components/loading/Loading";
import { SetSlugMovie } from "../contextApi/setSlugMovie";
const urlTv_Shows = "https://phimapi.com/v1/api/danh-sach/tv-shows";
const urlCatoon = "https://phimapi.com/v1/api/danh-sach/hoat-hinh";
const urlSingleMovie = "https://phimapi.com/v1/api/danh-sach/phim-le";
const urlSeries = "https://phimapi.com/v1/api/danh-sach/phim-bo";
const ContentMovie = () => {
  const [tv_Shows, setTv_Shows] = useState([]);
  const [single, setSingle] = useState([]);
  const [series, setSeries] = useState([]);
  const [cartoon, setCartoon] = useState([]);
  const { converLanguage } = useContext(SetSlugMovie);

  useEffect(() => {
    FetchData(urlTv_Shows, setTv_Shows);
  }, []);

  useEffect(() => {
    FetchData(urlCatoon, setCartoon);
  }, []);

  useEffect(() => {
    FetchData(urlSeries, setSeries);
  }, []);

  useEffect(() => {
    FetchData(urlSingleMovie, setSingle);
  }, []);
  const { FetchData } = useContext(ContextApi);
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
    <div>
      {" "}
      <Render data={tv_Shows} title="Tv-Shows" />
      <Render
        data={series}
        title={converLanguage ? "Series Movie" : "Phim bộ"}
      />
      <Render
        data={single}
        title={converLanguage ? "Single Movie" : "Phim lẻ"}
      />
      <Render data={cartoon} title={converLanguage ? "Cartoon" : "Hoạt hình"} />
    </div>
  );
};

export default ContentMovie;
