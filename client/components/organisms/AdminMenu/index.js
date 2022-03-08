import React from "react";
import closeBtn from "../../../assets/icons/icon_close-small.svg";
const AdminMenu = (props) => {
  return (
    <div className="menuBG">
      <div className="closeBtn">
        <img className="closeImg " src={closeBtn} />
        <span>שלום דניאל</span>
      </div>

      <div className="navLinks">
        <a className="linkName" href="/">
          <span>החורשה שלי</span>
        </a>
        <a className="linkName" href="/">
          <span>עדכון פרטים אישיים</span>
        </a>
        <a className="invitFriendsLink linkName" href="/">
          <span>הזמן חברים</span>
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

export default AdminMenu;
