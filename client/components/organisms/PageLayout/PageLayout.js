import React, { useState } from "react";
import treesIcon from "../../../assets/icons/trees.svg";
import Burger from "../../atoms/Burger/Burger";
import Menu from "../Menu";

export default function PageLayout(props) {
  const { showMenu = true } = props
  const [open, setOpen] = useState(false);
  const [adminMenuSearch, setAdminMenuSearch] = useState(false);

  const handleMenu = () => {
    console.log("menu should open");
    setOpen(!open);
  };



  return (
    <div className="layoutBG">
      {open ? (
        <Menu open={open} fn={handleMenu} />
      ) : null}
      <div className='layout-header'>
        {showMenu && <div className="menuBtn">
          <Burger open={open} fn={handleMenu} />
        </div>}
        {props.treesIcon ? <img src={treesIcon} id="treesIcon" /> : false}
        <p id={props.titleStyle ? "pageTitle" : "pageHigherTitle"}>
          {props.title}
        </p>
      </div>
      <div
        className={(props.innerPage ? "innerPageLayout" : "innerPageLayoutCross") + " " + props.className}
      >
        {props.children}
      </div>
    </div>
  );
}
