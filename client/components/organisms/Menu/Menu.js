import React, { useState } from "react";
import closeBtn from "../../../assets/icons/icon_close-small.svg";
import treeImg from "../../../assets/icons/tree.svg";

const Menu = ({ open, setOpen, fn }) => {
  const [forests, setForests] = useState(false);

  const handleMoreForests = () => {
    setForests(!forests);
  };

  return (
    <div className="menuBG">
      <div className="closeBtn">
        <img className="closeImg " src={closeBtn} onClick={fn} />
        <span>שלום דניאל</span>
      </div>

      <div className="navLinks">
        <a className="linkName" href="/">
          <span className="middleLink">החורשה שלי</span>
        </a>
        <a className="linkName" href="/">
          <span className="middleLink">עדכון פרטים אישיים</span>
        </a>
        <a className=" linkName" href="/">
          <span className="middleLink">הזמן חברים</span>
        </a>
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
