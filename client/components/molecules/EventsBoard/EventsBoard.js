import React from "react";
import treesIcon from "../../../assets/icons/tree02.svg";

const EventBoard = () => {
  return (
    <div className="announcment">
      <div className="tree">
        <img src={treesIcon} />
      </div>
      <div className="eventsText">לא צפויים אירועים בקרוב</div>
    </div>
  );
};

export default EventBoard;
