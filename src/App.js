import { lazy, Suspense, useContext } from "react";
import style from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import { Provider } from "./contextApi/Context";
import { FetchApi } from "./fetchApi/FetchApi";
import { Slug } from "./contextApi/setSlugMovie";
import Watching from "./pages/Watching";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Heart from "./components/heart/Heart";
const Home = lazy(() => import("./pages/Home"));
const SingleMovie = lazy(() => import("./pages/SingleMovie"));
const Series = lazy(() => import("./pages/Series"));
const TVShow = lazy(() => import("./pages/TVShow"));
const Cartoon = lazy(() => import("./pages/Cartoon"));
const Search = lazy(() => import("./pages/Search"));

function App() {
  return (
    <Slug>
      <FetchApi>
        <Provider>
          <div className={style.app}>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Single-Movie/:page" element={<SingleMovie />} />
                <Route path="/Series/:page" element={<Series />} />
                <Route path="/Tv-Shows/:page" element={<TVShow />} />
                <Route path="/Cartoon/:page" element={<Cartoon />} />
                <Route path="/Search" element={<Search />} />
                <Route path="/WatchMovie/:slug/:id" element={<Watching />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Heart" element={<Heart />} />
              </Routes>
            </Suspense>
          </div>
        </Provider>
      </FetchApi>
      <Routes>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Slug>
  );
}

export default App;
