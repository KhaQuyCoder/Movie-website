import React, { startTransition, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Data.module.scss";
import { SetSlugMovie } from "../contextApi/setSlugMovie";
const Data = ({
  seeMore,
  Login,
  dataList = [],
  dataListIsLogin = [],
  display,
  language,
}) => {
  const reflistItemPcIsLogin = useRef();
  const refBack = useRef();
  const [notChild, setNotChild] = useState(true);
  const [isLanguage, setIsLanguage] = useState(false);

  const { setTheme } = useContext(SetSlugMovie);
  const { converLanguage, setConverLanguage } = useContext(SetSlugMovie);

  const handelOptionLanguage = () => {
    setIsLanguage(true);
    setNotChild(false);
    refBack.current.style.display = "block";
    reflistItemPcIsLogin.current.style.display = "block";
  };

  const handelBack = () => {
    setIsLanguage(false);
    reflistItemPcIsLogin.current.style.display = "block";
    setNotChild(true);
    refBack.current.style.display = "none";
  };

  const handelLanguage = (item) => {
    if (item === "Tiếng anh") {
      setConverLanguage(true);
    } else setConverLanguage(false);
  };
  return (
    <>
      {seeMore && (
        <div className={style.listItemPc}>
          {dataList.map((item, index) => (
            <Link className={style.itemData} key={index} to={item.path}>
              {converLanguage ? item.nameEn : item.name}
            </Link>
          ))}
        </div>
      )}
      {Login && (
        <div className={style.listItemPcIsLogin}>
          <div className={style.back} ref={refBack} onClick={handelBack}>
            <i class="fa-solid fa-arrow-left"></i>
          </div>
          <div className={style.wraper} ref={reflistItemPcIsLogin}>
            {notChild && (
              <div className={style.main}>
                <Link className={style.itemDataLoginn} to={"/Profile"}>
                  Hồ sơ
                </Link>
                <li
                  className={style.itemDataLoginn}
                  onClick={handelOptionLanguage}
                >
                  Ngôn ngữ
                </li>
                <Link className={style.itemDataLoginn} to={"/Heart"}>
                  Phim yêu thích
                </Link>

                <Link className={style.itemDataLoginn} to={"/Login"}>
                  Đăng xuất
                </Link>
              </div>
            )}

            {isLanguage &&
              language.map((item, index) => (
                <li
                  className={style.itemDataLoginn}
                  key={index}
                  onClick={() => handelLanguage(item)}
                >
                  {item}
                </li>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Data;
