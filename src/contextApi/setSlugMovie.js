import { createContext, useState } from "react";

export const SetSlugMovie = createContext();

export const Slug = ({ children }) => {
  const dataLocalStorage = JSON.parse(localStorage.getItem("uses") || "[]");
  const NickName = JSON.parse(localStorage.getItem("description") || "[]");
  console.log(dataLocalStorage);
  const [slug, setSlug] = useState("");
  const [total, setTotal] = useState(1);
  const [timeLoad, setTimeload] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [indexNext, setIndexNext] = useState(1);
  const [indexBack, setIndexBack] = useState(1);
  const [isLogin, setIsLogin] = useState(false);
  const [file, setFile] = useState(dataLocalStorage.urlImg || null);
  const [curentNav, setCurrentNav] = useState(0);
  const [phone, setPhone] = useState(dataLocalStorage.email || "");
  const [pass, setPass] = useState(dataLocalStorage.pass || "");
  const [converLanguage, setConverLanguage] = useState(false);
  const [description, setDescription] = useState(NickName);
  const [emailEdit, setEmailEdit] = useState(dataLocalStorage.email);
  const [passEdit, setPassEdit] = useState(dataLocalStorage.pass);
  const [heart, setHeart] = useState(false);
  const [idea, setIdea] = useState(false);
  const [history, setHistory] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [current, setCurrent] = useState(0);
  const [theme, setTheme] = useState(false);

  var use = {
    email: dataLocalStorage.email,
    pass: dataLocalStorage.pass,
    urlImg: dataLocalStorage.urlImg,
  };

  return (
    <SetSlugMovie.Provider
      value={{
        slug,
        setSlug,
        total,
        setTotal,
        timeLoad,
        setTimeload,
        currentPage,
        setCurrentPage,
        indexNext,
        setIndexNext,
        indexBack,
        setIndexBack,
        isLogin,
        setIsLogin,
        file,
        setFile,
        curentNav,
        setCurrentNav,
        use,
        phone,
        setPhone,
        pass,
        setPass,
        converLanguage,
        setConverLanguage,
        description,
        setDescription,
        emailEdit,
        setEmailEdit,
        passEdit,
        setPassEdit,
        heart,
        setHeart,
        history,
        setHistory,
        idea,
        setIdea,
        isEdit,
        setIsEdit,
        current,
        setCurrent,
        theme,
        setTheme,
      }}
    >
      {children}
    </SetSlugMovie.Provider>
  );
};
