import Footter from "../components/footer/Footter";
import Header from "../components/header/Header";
import MainSlide from "../components/mainSlide/MainSlide";
import style from "../stylePages/Home.module.scss";
import ContentMovie from "./ContentMovie";
import { SetSlugMovie } from "../contextApi/setSlugMovie";
const Home = () => {
  return (
    <>
      <div className={style.page}>
        <Header />
        <MainSlide />
        <ContentMovie />
      </div>
      <Footter />
    </>
  );
};

export default Home;
