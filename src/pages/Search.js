import React, { useContext, useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/header/Header";
import style from "../stylePages/Search.module.scss";
import Footter from "../components/footer/Footter";
import SearchMore from "../components/SuperSearch/SearchMore";
import { Context } from "../contextApi/Context";
import RenderPage from "../components/renderMovie/RenderPage";
import { SetSlugMovie } from "../contextApi/setSlugMovie";
const Search = () => {
  const [toggle, setToggle] = useState("");
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [errorRes, setErrorRes] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [tippy, SetTippy] = useState(true);
  const [searchMoreComponent, setSearchMoreComponent] = useState(true);
  const { nameFiml } = useContext(Context);
  const { converLanguage } = useContext(SetSlugMovie);

  const focus = useRef();

  const fecthData = async () => {
    try {
      if (toggle.trim() === "") return;
      SetLoading(true);
      const result = await axios.get(
        `https://phimapi.com/v1/api/tim-kiem?keyword=${toggle}&limit=20`
      );

      setData(result.data.data.items || []);
      SetLoading(false);

      if (result.data.data.items.length === 0) {
        setErrorRes(true);
      } else {
        setErrorRes(false);
      }
      focus.current.focus();
    } catch (error) {
      alert(error);
      SetLoading(false);
    }
  };

  const fecthDataSearch = async () => {
    try {
      if (toggle.trim() === "") return;
      const resultSearch = await axios.get(
        `https://phimapi.com/v1/api/tim-kiem?keyword=${toggle}&limit=20`
      );
      setDataSearch(resultSearch.data.data.items);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fecthDataSearch();
  }, [toggle]);

  useEffect(() => {
    setToggle(nameFiml);
  }, [nameFiml]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  function handerClickNameSearch(name) {
    SetTippy(false);
    setToggle(name);
    fecthData();
    if (toggle.trim() !== "") setSearchMoreComponent(false);
  }

  function handerSetToggle(value) {
    SetTippy(true);
    setToggle(value);
  }

  function handerEnter() {
    SetTippy(false);
    fecthData();
    if (toggle.trim() !== "") setSearchMoreComponent(false);
  }
  return (
    <>
      <Header />
      <div className={style.container}>
        <div>
          {loading && (
            <div className={style.loadiing}>
              <i className="fa-solid fa-spinner"></i>
            </div>
          )}
          {errorRes && !loading && (
            <div className={style.errorSearch}>
              {converLanguage
                ? "No search results found..."
                : "Không tìm thấy kết quả tìm kiếm..."}
            </div>
          )}

          <Tippy
            visible={dataSearch.length > 0}
            interactive={true}
            placement="bottom"
            className={style.tippy}
            render={(attrs) => (
              <div
                className={`${tippy && toggle.trim() !== "" ? style.box : {}}`}
                tabIndex="-1"
                {...attrs}
              >
                {tippy &&
                  toggle.trim() !== "" &&
                  dataSearch.map((item) => (
                    <div
                      key={item.id}
                      className={style.resSearch}
                      onClick={() => handerClickNameSearch(item.name)}
                    >
                      <span className={style.iconS}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </span>
                      <p className={style.nameRes}>{item.name}</p>
                    </div>
                  ))}
              </div>
            )}
          >
            <div className={style.wraper}>
              <input
                onChange={(e) => handerSetToggle(e.target.value)}
                type="text"
                spellCheck="false"
                ref={focus}
                className={style.text}
                placeholder={
                  converLanguage
                    ? "Enter the keyword you want to search..."
                    : "Nhâp từ khóa cần tìm..."
                }
                onKeyDown={(e) => (e.key === "Enter" ? handerEnter() : {})}
                value={toggle}
              />

              <div
                className={style.SearchIcon}
                style={toggle.trim() !== "" ? { color: "#1CC749" } : {}}
              >
                <i
                  onClick={() => handerEnter()}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>
            </div>
          </Tippy>

          {searchMoreComponent && <SearchMore />}
          <div className={style.listMovie}>
            <RenderPage thumb={true} data={data} pages={false} />
          </div>
        </div>
      </div>
      <Footter />
    </>
  );
};

export default Search;
