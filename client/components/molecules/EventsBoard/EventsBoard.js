import React from "react";
import treesIcon from "../../../assets/icons/tree02.svg";

const EventBoard = () => {
  return (
    <div className="announcment">
      <div className="eventsText">לא צפויים אירועים בקרוב</div>
      <img src={treesIcon} className="tree" />
    </div>
  );
};

export default EventBoard;
