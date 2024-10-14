import React, { useContext, useEffect } from "react";
import style from "./Footter.module.scss";
import { SetSlugMovie } from "../../contextApi/setSlugMovie";

import Loading from "../loading/Loading";

const Footter = () => {
  const { timeLoad, setTimeload } = useContext(SetSlugMovie);
  useEffect(() => {
    const setTimeLoading = setTimeout(() => {
      setTimeload(false);
    }, 3000);

    return () => clearTimeout(setTimeLoading);
  }, []);

  if (timeLoad) {
    return <Loading />;
  }
  return (
    <div className={style.container}>
      <div className={style.wraper}>
        <div className={style.lorem}>
          <h3 className={style.titlee}>Giới thiệu</h3>
          <p className={style.lorem}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries,
          </p>
        </div>
        <div>
          <h3 className={style.title}>Về tôi</h3>
          <ul className={style.AboutMy}>
            <li>Sinh viên năm 3</li>
            <li>Font-End Developer</li>
            <li>Đại Học Khoa Học - Huế</li>
          </ul>
        </div>
        <div>
          <h3 className={style.title}>Các công nghệ</h3>
          <ul>
            <li className={style.technology}>Javascript</li>
            <li>ReactJs</li>
            <li>HTML</li>
            <li>CSS - 70%</li>
            <li>SCSS - 30%</li>
          </ul>
        </div>
        <div>
          <h3 className={style.title}>Liên hệ</h3>
        </div>
      </div>
      <div className={style.infor}>
        <span className={style.copyRight}>
          <i class="fa-regular fa-copyright"></i>
        </span>
        <p className={style.my}>
          Hồ Khả Quý - Khoa Công nghệ thông tin - Đại Học Khoa Học - Đại học Huế
        </p>
      </div>
    </div>
  );
};

export default Footter;
