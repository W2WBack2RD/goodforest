import React, { useEffect } from "react";
import arrowIcon from "../../../assets/icons/icon_chevron-small-left.svg";

const ArrowInput = (props) => {
  useEffect(() => {
    return () => {};
  }, [props.nameLeft, props.nameCenter, props.nameRight]);
  return (
    <div className="arrowInputWrap">
      <div className="arrowInput">
        <div className="arrowInputText_left">
          {props.name_left}
          <div className="arrowSign">
            <img src={arrowIcon} />
          </div>
        </div>
        <div className="arrowInputText_center">
          {props.name_center}
          <div className="arrowSign">
            <img src={arrowIcon} />
          </div>
        </div>
        <div className="arrowInputText_right">
          {props.name_right}
          <div className="arrowSign">
            <img src={arrowIcon} />
          </div>
        </div>
      </div>
      <div className="notes">
        <img className="closeImg" />
        <div className="notesText"></div>
      </div>
    </div>
  );
};

export default ArrowInput;
