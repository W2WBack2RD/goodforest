import React, { useEffect } from "react";
import arrowIcon from "../../../assets/icons/icon_chevron-small-left.svg";
import closeBtn from "../../../assets/icons/icon_close.svg";

const ArrowInput = (props) => {
  useEffect(() => {
    return () => { };
  }, [
    props.nameLeft,
    props.nameCenter,
    props.nameRight,
    props.open,
    props.data,
    props.setOpen,
  ]);

  const handleClose = () => {
    props.setOpen(!props.open);
  };

  return (
    <div className="arrowInputWrap">
      {/* <div className="arrowInput">
        <div className="arrowInputText_left">
          {props.nameLeft}
          <div className="arrowSign">
            <button>
              <img src={arrowIcon} onClick={props.functionL} />
            </button>
          </div>
        </div>
        <div className="arrowInputText_center">
          {props.nameCenter}
          <div className="arrowSign">
            <button>
              <img src={arrowIcon} onClick={props.functionC} />
            </button>
          </div>
        </div>
        <div className="arrowInputText_right">
          {props.nameRight}
          <div className="arrowSign">
            <button>
              <img src={arrowIcon} onClick={props.functionR} />
            </button>
          </div>
        </div>
      </div> */}
      {props.open ? (
        <div className="notes">
          <button>
            <img className="closeImg" src={closeBtn} onClick={handleClose} />
          </button>
          <div className="notesText">{props.data}</div>
        </div>
      ) : null}
    </div>
  );
};

export default ArrowInput;
