import React, { useContext, useRef, useState } from "react";
import style from "./Comment.module.scss";
import IMG from "../../image/IMG";
import { SetSlugMovie } from "../../contextApi/setSlugMovie";
import logoImgLogin from "../../assets/image/logoImgLogin.png";
import { Link } from "react-router-dom";
const Comment = () => {
  const [submit, setSubmit] = useState(false);
  const { file } = useContext(SetSlugMovie);
  const { converLanguage } = useContext(SetSlugMovie);
  const valueComment = useRef();
  const [listComment, setListComment] = useState([]);
  const refVale = useRef(null);
  const { isLogin } = useContext(SetSlugMovie);

  const handelClick = () => {
    setSubmit(true);
  };
  const handelClickClose = () => {
    setSubmit(false);
  };
  const handelComment = () => {
    var contentComment = valueComment.current.value;
    setListComment([...listComment, contentComment]);
    valueComment.current.value = "";
  };
  const handelValue = () => {};
  return (
    <>
      {isLogin ? (
        <div className={style.container}>
          <p className={style.title}>
            {converLanguage ? "Comment" : "Bình luận"}
          </p>
          <div className={style.wraper}>
            <div className={style.content}>
              <IMG src={file || logoImgLogin} className={style.imgComment} />
              <div className={style.mainComment}>
                <input
                  type="text"
                  placeholder={
                    converLanguage ? "write a comment..." : "Viết bình luận..."
                  }
                  className={style.textComent}
                  onClick={handelClick}
                  onChange={handelValue}
                  ref={valueComment}
                />
                {submit && (
                  <>
                    <div className={style.close} onClick={handelClickClose}>
                      {converLanguage ? "Close" : "Hủy"}
                    </div>
                    <div
                      className={style.sendComemnt}
                      ref={refVale}
                      onClick={handelComment}
                    >
                      {converLanguage ? "Comment" : "Bình luận"}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {listComment && (
            <div className={style.listComment}>
              <div className={style.contentt}>
                {listComment.map((comment, index) => (
                  <div className={style.mainComment} key={index}>
                    <IMG
                      src={file || logoImgLogin}
                      className={style.imgComment}
                    />
                    <div className={style.inforUse}>
                      <p className={style.nameUse}>Trần Bình An</p>
                      <p className={style.contentUse}>{comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className={style.checkLogin}>
          {converLanguage ? (
            <>
              Pleas
              <Link to={"/Login"} className={style.dn}>
                log in{" "}
              </Link>
              to comment
            </>
          ) : (
            <>
              Vui lòng
              <Link to={"/Login"} className={style.dn}>
                {" "}
                đăng nhập{" "}
              </Link>
              để bình luận
            </>
          )}
        </p>
      )}
    </>
  );
};

export default Comment;
