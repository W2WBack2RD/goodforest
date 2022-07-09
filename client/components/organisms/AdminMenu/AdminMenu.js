import R from "ramda";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import closeBtn from "_assets/icons/icon_close-small.svg";
import { attemptLogout } from "_thunks/auth";
const AdminMenu = ({ open, setOpen, fn, openMenu, handleMenu }) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(attemptLogout())
      .catch(R.identity);
  };

  return (
    <div>
      <div className="menuBG">
        <div className="closeBtn">
          <img className="closeImg " src={closeBtn} onClick={fn} />
          <span>שלום דניאל</span>
        </div>

        <div className="navLinks">
          <Link to="/settingsRegister">
            <div className="middleLink">עדכון פרטים אישיים</div>
          </Link>
        </div>
        <div className="logOutLink">
          <a onClick={logout}>
            <span>התנתקות</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
