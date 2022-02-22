import React from "react";
import treesIcon from "../../../assets/icons/trees.svg";
import menuIcon from "../../../assets/icons/icon_menu.svg";

import Container from "react-bulma-companion/lib/Container";

export default function PageLayout(props) {
  const openMenu = () => {
    console.log("menu should open");
  };
  return (
    <div className="layoutBG">
      <img src={menuIcon} id="menuIcon" onClick={openMenu} />
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
