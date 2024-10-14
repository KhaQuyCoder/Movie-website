import React, { useContext, useEffect, useRef, useState } from "react";
import "../../globalStyle/main.scss";
import { json, Link } from "react-router-dom";
import logo from "../../assets/image/logoNew2.webp";
import logoImgLogin from "../../assets/image/logoImgLogin.png";
import style from "./Header.module.scss";
import Button from "../button/Button";
import CustomTippy from "../../tippy/Tippy";
import Data from "../../tippy/Data";
import Search from "../../pages/Search";
import { SetSlugMovie } from "../../contextApi/setSlugMovie";
import IMG from "../../image/IMG";
const Header = () => {
  const dataLocalStorage = JSON.parse(localStorage.getItem("uses") || "[]");

  const [toggle, seTtoggle] = useState(false);
  const [check, setCheck] = useState(false);
  const { timeLoad, setTimeload } = useContext(SetSlugMovie);
  const { currentPage, setCurrentPage } = useContext(SetSlugMovie);
  const { setTotal } = useContext(SetSlugMovie);
  const { setIndexNext, setIndexBack } = useContext(SetSlugMovie);
  const { isLogin, setIsLogin } = useContext(SetSlugMovie);
  const refFile = useRef();
  const { file, setFile } = useContext(SetSlugMovie);
  const { curentNav, setCurrentNav } = useContext(SetSlugMovie);
  const { use } = useContext(SetSlugMovie);
  const { phone } = useContext(SetSlugMovie);
  const { pass } = useContext(SetSlugMovie);
  const { converLanguage } = useContext(SetSlugMovie);
  const { theme } = useContext(SetSlugMovie);

  const listItem_NavBar = [
    { name: "Trang chủ", nameEn: "Home", path: "/" },
    { name: "Phim lẻ", nameEn: "single movie", path: "/Single-Movie/page-1" },
    { name: "Phim bộ", nameEn: "Series Movie", path: "/Series/page-1" },
    { name: "TV Shows", nameEn: "TV Shows", path: "/Tv-Shows/page-1" },
    { name: "Hoạt hình", nameEn: "Cartoon", path: "/Cartoon/page-1" },
    { name: "Xem thêm", nameEn: "See more" },
  ];

  const dataList = [
    { name: "Âm nhạc", nameEn: "Music", path: "/Music" },
    { name: "Học tập", nameEn: "Learing", path: "/Learning" },
    { name: "Thể thao", nameEn: "Sport", path: "/sport" },
    { name: "K+", nameEn: "K+", path: "/K+" },
  ];

  const dataListIsLogin = isLogin
    ? [
        { name: "Hồ sơ", nameEn: "Profile", path: "/Profile" },
        { name: " Phim yêu thích", nameEn: "Movie like", path: "/Heart" },
        { name: "Đăng xuất", nameEn: "Login", path: "/Login" },
      ]
    : "";

  const language = ["Tiếng anh", "Tiếng việt"];
  const display = ["Dark", "Line"];

  const listMobileLogin = [
    isLogin ? "" : { name: "Đăng nhập / Đăng ký", path: "/Login" },
  ];

  const listItemMobile = [
    ...listItem_NavBar,
    ...dataList,
    ...listMobileLogin,
    ...dataListIsLogin,
  ];
  useEffect(() => {
    var s = JSON.parse(localStorage.getItem("uses") || "[]");
    if (s.email) {
      setIsLogin(true);
    }
  }, []);
  const handerUploadImg = (e) => {
    const f = e.target.files[0];
    if (f) {
      const urlImg = URL.createObjectURL(f);
      setFile(urlImg);
      use.urlImg = urlImg;
      use.email = phone;
      use.pass = pass;
      localStorage.setItem("uses", JSON.stringify(use));
      return () => URL.revokeObjectURL(urlImg);
    }
  };

  const handerClickUploadImg = () => {
    refFile.current.click();
    use.email = phone;
    use.pass = pass;
    localStorage.setItem("uses", JSON.stringify(use));
  };

  const handelClickItemNav = (index) => {
    setCheck(true);
    setCurrentNav(index);
    setTimeload(true);
    setCurrentPage(1);
    setIndexNext(1);
    setIndexBack(1);
    setTotal(1);
  };
  return (
    <>
      <header className={style.header}>
        <div
          className={style.menuMobile}
          onClick={() => {
            seTtoggle(!toggle);
          }}
        >
          <i class="fa-solid fa-bars"></i>
        </div>

        <img className={style.logo} src={logo} />

        <div className={style.listItem}>
          {listItem_NavBar.map((item, index) =>
            item.name === "Xem thêm" ? (
              <CustomTippy
                seeMore
                content={<Data seeMore dataList={dataList} />}
              >
                <div className={style.itemNav}>
                  {converLanguage ? item.nameEn : item.name}{" "}
                  <span className={style.up_down}>
                    <span className={style.up}>
                      <i id="up" class="fa-solid fa-caret-up"></i>
                    </span>
                    <span className={style.down}>
                      <i id="up" class="fa-solid fa-caret-down"></i>
                    </span>
                  </span>
                </div>
              </CustomTippy>
            ) : (
              <Link
                key={index}
                style={curentNav === index ? { color: "#00DC5A" } : {}}
                className={style.itemNav}
                to={item.path}
                onClick={() => handelClickItemNav(index)}
              >
                {converLanguage ? item.nameEn : item.name}
              </Link>
            )
          )}
        </div>

        <div className={style.option_Navbae}>
          <Link
            to={"/Search"}
            className={style.searchIcon}
            element={<Search />}
          >
            <i class="fa-solid fa-magnifying-glass"></i>{" "}
          </Link>
          <div className={style.bellIcon}>
            <i class="fa-regular fa-bell"></i>
          </div>
          {isLogin ? (
            <form className={style.form}>
              <label for="file" className={style.addImgLogin}>
                <i class="fa-solid fa-plus"></i>
              </label>
              <input
                multiple
                hidden
                type="file"
                name="file"
                className={style.file}
                id="file"
                ref={refFile}
                onChange={handerUploadImg}
              />

              <IMG
                className={style.imgLogin}
                src={file ? file : dataLocalStorage.urlImg}
                alt="User"
                onClick={handerClickUploadImg}
              />
              <div className={style.menuLogin}>
                <Data
                  Login={true}
                  dataListIsLogin={dataListIsLogin}
                  language={language}
                  display={display}
                />
              </div>
            </form>
          ) : (
            <span className={style.btn}>
              <Link to={"/Login"}>
                <Button title="Đăng nhập" login />
              </Link>
              <Link>
                <Button title="Đăng ký" register />
              </Link>
            </span>
          )}
        </div>

        {toggle && (
          <div className={style.listItemMobile}>
            {listItemMobile.map((item, index) => (
              <Link
                key={index}
                style={curentNav === index ? { color: "#00DC5A" } : {}}
                className={style.itemNav}
                to={item.path}
                onClick={() => {
                  seTtoggle(false);
                  setCurrentNav(index);
                  setTimeload(true);
                  setTotal(1);
                }}
              >
                {converLanguage ? item.nameEn : item.name}
              </Link>
            ))}
          </div>
        )}

        {toggle && (
          <div className={style.opa} onClick={() => seTtoggle(!toggle)}></div>
        )}
      </header>
    </>
  );
};

export default Header;
