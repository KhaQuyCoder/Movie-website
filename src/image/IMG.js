import React, { useState } from "react";
import NoImg from "../assets/image/imgError.jpg";
const IMG = ({ src, alt, ...props }) => {
  const [errorImg, setErrorImg] = useState();
  function handelImgError() {
    setErrorImg(NoImg);
  }
  return (
    <img {...props} alt={alt} src={errorImg || src} onError={handelImgError} />
  );
};

export default IMG;
