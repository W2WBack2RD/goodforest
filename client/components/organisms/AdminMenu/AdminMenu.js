import React, { useState } from "react";
import closeBtn from "../../../assets/icons/icon_close-small.svg";
import treeImg from "../../../assets/icons/tree.svg";
import AdminMenuSearch from "../AdminMenuSearch/AdminMenuSearch";
const AdminMenu = ({ open, setOpen, fn, openMenu, handleMenu }) => {
  const [moreForests, setMoreForests] = useState(false);

  const handleMoreForests = () => {
    setMoreForests(!moreForests);
  };

  return (
    <div>
      {moreForests ? (
        <AdminMenuSearch moreForests={moreForests} fn={handleMoreForests} />
      ) : (
        <div className="menuBG">
          <div className="closeBtn">
            <img className="closeImg " src={closeBtn} onClick={fn} />
            <span>שלום דניאל</span>
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
            <a className=" linkName" href="/">
              <span className="middleLink">יצירת חורשה חדשה</span>
            </a>
            <a className="linkName lastLink">
              <span onClick={handleMoreForests}>חורשות נוספות</span>
            </a>
          </div>
          <div className="logOutLink">
            <a href="/">
              <span>התנתקות</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
