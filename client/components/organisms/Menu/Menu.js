import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import closeBtn from "../../../assets/icons/icon_close-small.svg";
import treeImg from "../../../assets/icons/tree.svg";

const Menu = ({ open, setOpen, fn }) => {
  const { user } = useSelector(R.pick(["user"]));
  const dispatch = useDispatch();

  console.log(user);

  const [forests, setForests] = useState(false);

  useEffect(() => {
    if (R.isEmpty(user)) {
      // dispatch(push("/login"));
    }
  }, []);

  const handleMoreForests = () => {
    setForests(!forests);
  };

  return (
    <div className="menuBG">
      <div className="closeBtn">
        <img className="closeImg " src={closeBtn} onClick={fn} />
        <span>שלום {user.username}</span>
      </div>

      <div className="navLinks">
        <a className="linkName" href="/home">
          <span className="middleLink">החורשה שלי</span>
        </a>
        <a className="linkName" href="/settingsRegister">
          <span className="middleLink">עדכון פרטים אישיים</span>
        </a>
        <a className=" linkName" href="/">
          <span className="middleLink">הזמן חברים</span>
        </a>
        {/*
        <a className={forests ? "forestOpen" : "linkName lastLink"}>
          <span onClick={handleMoreForests}>חורשות נוספות</span>
          {forests ? (
            <div className="linkName lastLinkLinks">
              <span className="openForestLinks">
                <img className="treeEmpty" src={treeImg} />
                גאולים
              </span>
              <span className="openForestLinks">
                <img className="treeEmpty" src={treeImg} />
                הדרים
              </span>
            </div>
          ) : null}
        </a>
          */}
      </div>
      <div className="logOutLink">
        <a href="/">
          <span>התנתקות</span>
        </a>
      </div>
    </div>
  );
};

export default Menu;
