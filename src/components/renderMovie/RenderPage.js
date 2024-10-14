import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import style from "./RenderPage.module.scss";
import { SetSlugMovie } from "../../contextApi/setSlugMovie";
import Footer from "../footer/Footter";
import IMG from "../../image/IMG";

const RenderPage = ({ title, data, pages = { pages }, path }) => {
  const { setSlug } = useContext(SetSlugMovie);
  const { setTotal } = useContext(SetSlugMovie);
  const { setTimeload } = useContext(SetSlugMovie);
  const { currentPage, setCurrentPage } = useContext(SetSlugMovie);
  const [seeMore, setSeemore] = useState(false);
  const [hover, setHover] = useState(false);
  const { theme } = useContext(SetSlugMovie);

  const { indexNext, setIndexNext, indexBack, setIndexBack } =
    useContext(SetSlugMovie);
  const { converLanguage } = useContext(SetSlugMovie);

  const pRef = useRef();
  const refWidth = useRef(null);
  useEffect(() => {
    if (refWidth.current) refWidth.current.style.width = "max-content";
  }, []);
  function handerclick(index) {
    setTotal(index + 1);
    setTimeload(true);
    setCurrentPage(index + 1);
    setIndexBack(index + 1);
    setIndexNext(index + 1);
  }
  function handerclickSlug(par) {
    setTimeload(true);
    setSlug(par);
  }
  const handleNext = () => {
    if (indexNext < pages.length) {
      setIndexNext((prev) => {
        const newIndex = prev + 1;
        setCurrentPage(newIndex);
        setTotal(newIndex);
        return newIndex;
      });
      setTimeload(true);
      setIndexBack(indexNext + 1);
    }
  };

  const handleBack = () => {
    if (indexBack > 1) {
      setIndexBack((prev) => prev - 1);
      setTotal(indexBack - 1);
      setTimeload(true);
      setCurrentPage(indexBack - 1);
      setIndexNext(indexBack - 1);
    }
  };
  return (
    <>
      {pages ? (
        <div className={style.wraper}>
          <p
            className={style.titleMovie}
            ref={refWidth}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {title}

            {hover && (
              <>
                <span className={style.hover}>
                  <i class="fa-solid fa-arrow-right"></i>
                </span>
                <span className={style.hover}>
                  {converLanguage ? "Page" : "Trang"} {currentPage}
                </span>
              </>
            )}
          </p>
          <div className={style.main}>
            <div className={style.listMovie}>
              {data.length > 0 &&
                data.map((movie) => (
                  <div key={movie.id} className={style.movieMain}>
                    <Link
                      to={`/WatchMovie/${movie.slug}/${movie._id}`}
                      className={style.relative}
                    >
                      <IMG
                        loading="lazy"
                        className={style.picture}
                        src={`https://phimimg.com/${movie.poster_url}`}
                        alt={movie.name}
                        onClick={() => handerclickSlug(movie.slug)}
                      />
                      <div className={style.playIcon}>
                        <Link
                          className={style.playLink}
                          to={`/WatchMovie/${movie.slug}/${movie._id}`}
                        >
                          <i
                            className="fa-solid fa-play"
                            onClick={() => handerclickSlug(movie.slug)}
                          ></i>
                        </Link>
                      </div>
                    </Link>
                    <p className={style.name}>
                      {converLanguage ? movie.origin_name : movie.name}
                    </p>
                  </div>
                ))}
            </div>
            <div className={style.mainPages}>
              {seeMore && (
                <p className={style.title}>
                  {converLanguage
                    ? "List of movie pages"
                    : "Danh sách trang phim"}
                </p>
              )}
              <div className={style.wraperPages}>
                {seeMore &&
                  pages.map((page, index) => (
                    <Link
                      ref={pRef}
                      key={index}
                      to={`/${path}/page-${index + 1}`}
                      className={style.link}
                      onClick={() => handerclick(index)}
                    >
                      <p
                        style={
                          currentPage === index + 1
                            ? { color: "red" }
                            : { color: "#1CC749" }
                        }
                      >
                        {page}
                      </p>
                    </Link>
                  ))}
              </div>
              <div className={style.wraperBtn}>
                <div>
                  {seeMore === false && (
                    <>
                      <Link
                        to={`/${path}/page-${
                          indexBack - 1 === 0 ? 1 : indexBack - 1
                        }`}
                        onClick={handleBack}
                      >
                        <button className={style.btnBack}>
                          {converLanguage
                            ? "Return to the next page"
                            : "Quay lại trang sau"}
                        </button>
                      </Link>
                      <Link
                        to={`/${path}/page-${indexNext + 1}`}
                        onClick={handleNext}
                      >
                        <button className={style.btnNext}>
                          {converLanguage ? "Next page" : "Trang tiếp theo"}
                        </button>
                      </Link>{" "}
                    </>
                  )}
                </div>
                <button
                  className={style.btnAll}
                  onClick={() => setSeemore(!seeMore)}
                >
                  {seeMore
                    ? converLanguage
                      ? "Hide view all pages"
                      : "Ẩn xem tất cả các trang"
                    : converLanguage
                    ? "View all pages"
                    : " Xem tất cả các trang"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.wraperSearch}>
          <div className={style.listMovie}>
            {data.length > 0 &&
              data.map((movie) => (
                <div key={movie.id} className={style.movieMain}>
                  <Link to={`/WatchMovie/${movie.slug}/${movie._id}`}>
                    <IMG
                      loading="lazy"
                      className={style.picture}
                      src={`https://phimimg.com/${movie.thumb_url}`}
                      alt={movie.name}
                      onClick={() => handerclickSlug(movie.slug)}
                    />
                    <div className={style.playIcon}>
                      <Link
                        className={style.playLink}
                        to={`/WatchMovie/${movie.slug}/${movie._id}`}
                      >
                        <i
                          className="fa-solid fa-play"
                          onClick={() => handerclickSlug(movie.slug)}
                        ></i>
                      </Link>
                    </div>
                  </Link>
                  <p className={style.name}>
                    {converLanguage ? movie.origin_name : movie.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RenderPage;
