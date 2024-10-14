import React from "react";
import Header from "../components/header/Header";
import RightContent from "../components/ActionProfile/RightContent";
import style from "../stylePages/Profile.module.scss";
const Profile = () => {
  return (
    <div>
      <Header />
      <div className={style.wraper}>
        <RightContent />
      </div>
    </div>
  );
};

export default Profile;
