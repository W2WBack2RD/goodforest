import React from "react";

const ArrowInput = (props) => {
  return (
    <div>
      <div className="arrowInputText_left">
        {props.name_left}
        <div className="arrowSign" onclick={props.function}></div>
      </div>
      <div className="arrowInputText_center">
        {props.name_center}
        <div className="arrowSign"></div>
      </div>
      <div className="arrowInputText_right">
        {props.name_right}
        <div className="arrowSign"></div>
      </div>
      <div className="notes">
        <img className="closeImg" />
        <div className="notesText"></div>
      </div>
    </div>
  );
};

export default ArrowInput;
