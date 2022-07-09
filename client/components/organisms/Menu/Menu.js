import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import R from "ramda";
import closeBtn from "../../../assets/icons/icon_close-small.svg";
import { Link } from "react-router-dom";
import { attemptLogout } from "_thunks/auth";

const Menu = ({ open, setOpen, fn }) => {
  const { user } = useSelector(R.pick(["user"]));
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(attemptLogout())
      .catch(R.identity);
  };

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
        <span>שלום {user.fullName}</span>
      </div>

      <div className="navLinks">
        <Link to="/home">
          <div className="middleLink">החורשה שלי</div>
        </Link>
        <Link to="/settingsRegister">
          <div className="middleLink" >עדכון פרטים אישיים</div>
        </Link>
      </div>
      <div className="logOutLink">
        <a onClick={logout}>
          <span>התנתקות</span>
        </a>
      </div>
    </div>
  );
};

export default Menu;
