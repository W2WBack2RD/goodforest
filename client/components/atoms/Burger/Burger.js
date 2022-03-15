import React from "react";
import menuIcon from "../../../assets/icons/icon_menu.svg";

const Burger = ({ open, setOpen, fn }) => {
  return (
    <div>
      <img src={menuIcon} id="menuIcon" onClick={fn} />
    </div>
  );
};

export default Burger;
