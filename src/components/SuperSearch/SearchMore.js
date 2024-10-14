import { Link } from "react-router-dom";
import style from "./SearchMore.module.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../contextApi/Context";
import { SetSlugMovie } from "../../contextApi/setSlugMovie";
import IMG from "../../image/IMG";
const SearchMore = () => {
  const [result, setResult] = useState([]);
  const { setNameFiml } = useContext(Context);
  const { setSlug } = useContext(SetSlugMovie);
  const { timeLoad, setTimeload } = useContext(SetSlugMovie);
  const { converLanguage } = useContext(SetSlugMovie);

  const getValue = (name) => {
    setNameFiml(name);
  };
  const data = [
    {
      name: "Hoa Gian Lệnh",
      nameEn: "In Blossom",
      year: "2024",
      episode: "32/32",
      lang: "Vietsub",
      nation: "Trung Quốc",
      nationEn: "China",
      src: "https://phimimg.com/upload/vod/20240323-1/c52079a69a48e34a498acab8a27bdc49.jpg",
      slug: "hoa-gian-lenh",
      _id: "8cd9bd4360545ed5c9dc55702631cd7ff",
    },
    {
      name: "Lưu Thủy Điều Điều",
      nameEn: "Love Of Nirvana",
      year: "2024",
      episode: "22/40",
      lang: "Vietsub",
      nation: "Trung Quốc",
      nationEn: "China",
      src: "https://phimimg.com/upload/vod/20240915-1/08fe783029ef9f14f2d6ac40b3f017c8.jpg",
      slug: "luu-thuy-dieu-dieu",
      _id: "8cd9bd436016ed5c9dc55702631cd7ff",
    },
    {
      name: "Thả Thí Thiên Hạ",
      nameEn: "Who Rules The World",
      year: "2022",
      episode: "40/40",
      lang: "Vietsub",
      nation: "Trung Quốc",
      nationEn: "China",
      src: "https://phimimg.com/upload/vod/20240814-1/b9fd0dcca05596dab60e8f265569ee80.jpg",
      slug: "tha-thi-thien-ha",
      id: '_id: "8cd9bd436016ed5c9dc55702631cd7cc",',
    },
    {
      name: "Thần Ẩn",
      nameEn: "The Last Immortal",
      year: "2024",
      episode: "32/32",
      lang: "Vietsub",
      nation: "Trung Quốc",
      nationEn: "China",
      src: "https://phimimg.com/upload/vod/20240104-1/b24ce9c9bcb2a8153e821269d408f796.jpg",
      slug: "than-an",
      id: '_id: "8cd9bd43234216ed5c9dc55702631cd7cc",',
    },
    {
      name: "Mộng Hoa Lục",
      nameEn: '"A Dream of Splendor',
      year: "2024",
      episode: "40/40",
      lang: "Vietsub",
      nation: "Trung Quốc",
      nationEn: "China",
      src: "https://phimimg.com/upload/vod/20231217-1/21479e60672dab189126fdc56bf6bc17.jpg",
      slug: "mong-hoa-luc",
      id: '_id: "4cd9bd436016ed5c9dc55743631cd7cc",',
    },
    {
      name: "Kiếm Lai",
      nameEn: "search again",
      year: "2024",
      episode: "9/26",
      lang: "Vietsub",
      nation: "Trung Quốc",
      nationEn: "China",
      src: "https://phimimg.com/upload/vod/20240822-1/f556a9a87ce844eed3f095c416ec25af.jpg",
      slug: "kiem-lai",
      id: '_id: "8cd9bd4353416ed5c9dc55702631cd7cc",',
    },
    {
      name: "Yêu Em Từ Dạ Dày",
      nameEn: "Love You From My Stomach",
      year: "2024",
      episode: "24/24",
      lang: "Vietsub",
      nation: "Trung Quốc",
      nationEn: "China",
      src: "https://phimimg.com/upload/vod/20240924-1/fff40a84239e5bed85af229cc2dcdf9d.jpg",
      slug: "yeu-em-tu-da-day",
      id: '_id: "8cd9bd4534016ed5c9dc55702631cd7cc",',
    },
  ];

  useEffect(() => {
    const fecthData = async () => {
      try {
        const data = await axios.get(
          "https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=2"
        );
        setResult(data.data.items);
      } catch (error) {
        alert(error);
      }
    };
    fecthData();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.wraper}>
        <div className={style.movieHot}>
          <p className={style.title}>
            {converLanguage ? "Recent trends" : "Xu hướng gần đây"}
          </p>
          {data.map((item, index) => (
            <div key={index} className={style.content}>
              <Link to={`/WatchMovie/${item.slug}/${item.id}`}>
                <IMG
                  className={style.img}
                  src={item.src}
                  onClick={() => {
                    setSlug(item.slug);
                    setTimeload(true);
                  }}
                />
              </Link>
              <div className={style.contentMovie}>
                <Link
                  to={`/WatchMovie/${item.slug}/${item.id}`}
                  className={style.name}
                  onClick={() => {
                    setSlug(item.slug);
                    setTimeload(true);
                  }}
                >
                  <p>{converLanguage ? item.nameEn : item.name}</p>
                </Link>
                <div className={style.inforMovie}>
                  <p className={style.year}>{item.year}</p>
                  <p className={style.episode}>{item.episode}</p>
                  <p className={style.nation}>
                    {converLanguage ? item.nationEn : item.nation}
                  </p>
                  <p className={style.lang}>{item.lang}</p>
                </div>
              </div>
            </div>
          ))}
          ;
        </div>
        <div className={style.searchMore}>
          <p className={style.title}>
            {converLanguage ? "Top searches" : "Tìm kiếm hàng đầu"}
          </p>
          <div className={style.listname}>
            {result.map((res) => (
              <p className={style.nameS} onClick={() => getValue(res.name)}>
                {converLanguage ? res.origin_name : res.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMore;
