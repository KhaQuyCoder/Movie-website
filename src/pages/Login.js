import React, { useRef, useState, useContext } from "react";
import style from "../stylePages/Login.module.scss";
import Button from "../components/button/Button";
import { SetSlugMovie } from "../contextApi/setSlugMovie";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const refValuePhone = useRef();
  const refValuePass = useRef();
  const refMessagePhone = useRef();
  const refMessagePass = useRef();
  const [checkPhone, setCheckPhone] = useState(false);
  const [checkPass, setCheckPass] = useState(false);
  const navigate = useNavigate();
  const { timeLoad, setTimeload } = useContext(SetSlugMovie);
  const { setIsLogin } = useContext(SetSlugMovie);
  const { file } = useContext(SetSlugMovie);
  const { use } = useContext(SetSlugMovie);
  const { setPhone } = useContext(SetSlugMovie);
  const { setPass } = useContext(SetSlugMovie);

  const handerClick = (e) => {
    var checkPhone = false;
    var checkPass = false;
    e.preventDefault();
    const valuePhone = refValuePhone.current.value;
    const valuePass = refValuePass.current.value;

    if (!/^[^s@]+@[^s@]+.[^s@]+$/.test(valuePhone)) {
      refMessagePhone.current.style.display = "block";
      refMessagePhone.current.style.color = "red";
      refValuePhone.current.style.border = "2px solid red";
    } else {
      checkPhone = true;
      refMessagePhone.current.style.display = "none";
      refValuePhone.current.style.border = "none";
    }
    if (valuePass.length <= 5 || valuePass.length > 15) {
      refMessagePass.current.style.display = "block";
      refMessagePass.current.style.color = "red";
      refValuePass.current.style.border = "2px solid red";
    } else {
      checkPass = true;
    }
    if (checkPass && checkPhone) {
      setCheckPhone(true);
      setCheckPass(true);
      navigate("/");
      setTimeload(true);
      setIsLogin(true);
      setPhone(valuePhone);
      setPass(valuePass);
      use.email = valuePhone;
      use.pass = valuePass;
      localStorage.setItem("uses", JSON.stringify(use));
    }
  };

  const handerInputPhone = () => {
    refValuePhone.current.style.borderColor = "green";
    refMessagePhone.current.style.display = "none";
  };
  const handerInputPass = () => {
    refValuePass.current.style.borderColor = "green";
    refMessagePass.current.style.display = "none";
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.wraper}>
          <form>
            <label>
              <h1 className={style.login}>Đăng nhập</h1>
              <div className={style.title}>
                <div className={style.wraperInput}>
                  <input
                    className={style.inputPhone}
                    type="text"
                    placeholder="Nhập Email..."
                    onChange={handerInputPhone}
                    ref={refValuePhone}
                  />
                  <p className={style.messagePhone} ref={refMessagePhone}>
                    <i class="fa-solid fa-circle-exclamation"></i> Email không
                    hợp lệ!
                  </p>
                </div>
                <div className={style.wraperInput}>
                  <input
                    className={style.inputPassWord}
                    type="password"
                    placeholder="Mật khẩu..."
                    onChange={handerInputPass}
                    ref={refValuePass}
                  />
                  <p className={style.messagePass} ref={refMessagePass}>
                    <i class="fa-solid fa-circle-exclamation"></i> Mật khẩu
                    không đủ mạnh!
                  </p>
                </div>
                <Button
                  submit
                  title={"Đăng nhập"}
                  onClick={handerClick}
                  checkPass={checkPass}
                  checkPhone={checkPhone}
                />
              </div>
            </label>
          </form>
        </div>
      </div>
      <div className={style.opa}></div>
    </>
  );
};

export default Login;
