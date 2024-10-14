import React, { useContext, useEffect, useRef, useState } from "react";
import IMG from "../../image/IMG";
import style from "./RightContent.module.scss";
import { SetSlugMovie } from "../../contextApi/setSlugMovie";
import Heart from "../heart/Heart";
const RightContent = () => {
  const Profile = JSON.parse(localStorage.getItem("uses"));
  const dataLocalStorage = JSON.parse(localStorage.getItem("uses") || "[]");

  var arr = [];

  const { heart } = useContext(SetSlugMovie);
  const { history } = useContext(SetSlugMovie);
  const { idea } = useContext(SetSlugMovie);
  const { isEdit, setIsEdit } = useContext(SetSlugMovie);
  const { description, setDescription } = useContext(SetSlugMovie);
  const { emailEdit, setEmailEdit } = useContext(SetSlugMovie);
  const { passEdit, setPassEdit } = useContext(SetSlugMovie);
  const { file } = useContext(SetSlugMovie);

  const refEmail = useRef();
  const refPassNew = useRef();
  const refPassOld = useRef();
  const refNickName = useRef();

  const handelEdit = () => {
    setIsEdit(true);
  };

  const converPass = (str) => {
    for (let i = 0; i < str?.length; i++) {
      arr.push("*");
    }
    return arr.join("");
  };
  const hanlerChange = () => {
    var valueNickName = refNickName.current.value;
    var valuePassOld = refPassOld.current.value;
    var valuePassNew = refPassNew.current.value;
    var valueEmail = refEmail.current.value;

    localStorage.setItem("description", JSON.stringify(valueNickName));
    const use = JSON.parse(localStorage.getItem("uses") || "{}");
    setDescription(valueNickName);
    if (valueEmail !== " ") {
      if (/^[^s@]+@[^s@]+.[^s@]+$/.test(valueEmail)) {
        use.email = valueEmail;
        localStorage.setItem("uses", JSON.stringify(use));
        setEmailEdit(valueEmail);
      }
    }
    if (valuePassOld !== " " && valuePassNew !== "") {
      if (valuePassOld === passEdit) {
        use.pass = valuePassNew;
        localStorage.setItem("uses", JSON.stringify(use));
        setPassEdit(valuePassNew);
      }
    }

    refNickName.current.value = "";
    refEmail.current.value = "";
    refPassNew.current.value = "";
    refPassOld.current.value = "";
  };
  return (
    <>
      {isEdit && (
        <div className={style.container}>
          <div className={style.wraper}>
            <IMG className={style.imgProfile} src={file} />
            <div className={style.infor}>
              <p className={style.emailProfile}>
                NickName: {description}
                <span className={style.edit} onClick={handelEdit}>
                  <i class="fa-solid fa-pen"></i>
                </span>
              </p>
              <p className={style.emailProfile}>
                Email : {dataLocalStorage.email}{" "}
                <span className={style.edit} onClick={handelEdit}>
                  <i class="fa-solid fa-pen"></i>
                </span>
              </p>
              <p className={style.emailProfile}>
                Password: {converPass(dataLocalStorage.pass)}
                <span className={style.edit} onClick={handelEdit}>
                  <i class="fa-solid fa-pen"></i>
                </span>
              </p>
            </div>
          </div>
          <>
            {isEdit && (
              <>
                <div className={style.arreaEdit}>
                  <form className={style.form}>
                    <label className={style.passOld}>
                      <p className={style.passText}>Mật khẩu cũ:</p>
                      <input
                        ref={refPassOld}
                        className={style.inputProfile}
                        type="text"
                        placeholder="Thay đổi mật khẩu..."
                      />
                    </label>
                    <label className={style.passNew}>
                      <p className={style.passText}>Mật khẩu mới:</p>
                      <input
                        ref={refPassNew}
                        className={style.inputProfile}
                        type="text"
                        placeholder="Thay đổi mật khẩu..."
                      />
                    </label>

                    <label className={style.email}>
                      <p className={style.emailText}>Email:</p>
                      <input
                        ref={refEmail}
                        className={style.inputProfile}
                        type="text"
                        placeholder="Thay đổi email..."
                      />
                    </label>
                    <label className={style.passNew}>
                      <p className={style.passText}>NickName:</p>
                      <input
                        ref={refNickName}
                        className={style.inputProfile}
                        type="text"
                        placeholder="Thêm nickname"
                      />
                    </label>
                  </form>
                  <button
                    type="button"
                    className={style.btn}
                    onClick={hanlerChange}
                  >
                    Thay đổi
                  </button>
                </div>
              </>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default RightContent;
