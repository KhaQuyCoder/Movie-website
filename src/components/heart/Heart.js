import React from "react";
import style from "./Heart.module.scss";
import Header from "../header/Header";
const Heart = () => {
  const dataHeart = JSON.parse(localStorage.getItem("listHeart") || "[]");
  return (
    <div>
      <Header />
      <div className={style.main}>
        <p className={style.title}>Danh sách phim đã yêu thích</p>
        <div>
          <table className={style.table}>
            <tr className={style.tr}>
              <th className={style.thh}>Tên phim</th>
              <th className={style.th}>Năm</th>
              <th className={style.th}>Số tập</th>
              <th className={style.th}>Quốc gia</th>
            </tr>

            {dataHeart.map((item, index) => (
              <tr key={index}>
                <td className={style.data}>
                  <div className={style.nameHeart}>
                    <img
                      src={item?.img}
                      alt={`${item?.name} poster`}
                      className={style.imgHeart}
                    />
                    <p className={style.name}>{item?.name}</p>
                  </div>
                </td>
                <td className={style.data}>{item?.year}</td>
                <td className={style.data}>{item?.episoder}</td>
                <td className={style.data}>{item?.nation}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Heart;
