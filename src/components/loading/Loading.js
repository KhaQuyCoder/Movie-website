import React, { useEffect, useState } from "react";
import style from "./Loading.module.scss";
const Loading = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const setTimeLoading = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(setTimeLoading);
  }, []);
  return (
    <div className={style.container}>
      {loading && (
        <div className={style.Loading}>
          <i class="fa-solid fa-spinner"></i>
        </div>
      )}
    </div>
  );
};

export default Loading;
