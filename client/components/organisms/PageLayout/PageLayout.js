import React, { useState } from "react";
import treesIcon from "../../../assets/icons/trees.svg";
import { request } from "_api/request";

import Container from "react-bulma-companion/lib/Container";
import Burger from "../../atoms/Burger/Burger";
import Menu from "../Menu";
import AdminMenu from "../AdminMenu/AdminMenu";
import AdminMenuSearch from "../AdminMenuSearch/AdminMenuSearch";

import { getUser } from "../../../api/user";

export default function PageLayout(props) {
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [adminMenuSearch, setAdminMenuSearch] = useState(false);

  const [userResponse, setUserResponse] = React.useState("");
  const [userResponseData, setUserResponseData] = React.useState([]);

  //get from db if admin
  const getAllUsers = () => {
    request
      .get("/api/user/")
      .send()
      .then((result) => {
        setAdmin(result.body.user.is_admin);
      })
      .catch();
  };
  const handleMenu = () => {
    console.log("menu should open");
    setOpen(!open);
  };

  const handleAdminMenu = () => {
    setOpen(false);
    setAdmin(!admin);
    setAdmin(true);
  };

  const handleMenuSearch = () => {
    setAdminMenuSearch(!adminMenuSearch);
  };
  return (
    <div className="layoutBG">
      <div className="menuBtn">
        <Burger open={open} fn={handleMenu} />
        {open ? (
          admin ? (
            <AdminMenu
              openMenu={open}
              handleMenu={handleMenu}
              open={adminMenuSearch}
              fn={handleAdminMenu}
            />
          ) : (
            <Menu open={open} fn={handleMenu} />
          )
        ) : null}
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
