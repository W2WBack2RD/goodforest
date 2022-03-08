import React, { useState } from "react";
import treesIcon from "../../../assets/icons/trees.svg";

import Container from "react-bulma-companion/lib/Container";
import Burger from "../../atoms/Burger/Burger";
import Menu from "../Menu";

export default function PageLayout(props) {
  const [open, setOpen] = useState(false);
  const handleMenu = () => {
    console.log("menu should open");
    setOpen(!open);
  };
  return (
    <div className="layoutBG">
      <div className="menuBtn">
        <Burger open={open} fn={handleMenu} />
        {open ? <Menu open={open} fn={handleMenu} /> : null}
      </div>

      {props.treesIcon ? <img src={treesIcon} id="treesIcon" /> : false}
      <p id={props.titleStyle ? "pageTitle" : "pageHigherTitle"}>
        {props.title}
      </p>
      <div
        className={props.innerPage ? "innerPageLayout" : "innerPageLayoutCross"}
      >
        {props.children}
      </div>
    </div>
  );
}
