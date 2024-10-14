import React from "react";
import style from "./Button.module.scss";
import { Link } from "react-router-dom";
const Button = ({ title, login, register, submit, onClick }) => {
  const classes = `${login ? style.login : {}} ${
    register ? style.register : {}
  } ${submit ? style.submit : {}}
  } `;
  return (
    <>
      {login || register ? (
        <button className={classes}>{title}</button>
      ) : (
        <button
          type={submit ? "submit" : "button"}
          className={classes}
          onClick={onClick}
        >
          {title}
        </button>
      )}
    </>
  );
};

export default Button;
