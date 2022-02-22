import React from "react";
const InputCircle = (props) => {
  return (
    <div className="InputCircle">
      <div>
        <div className="circle_left">{props.input_left}</div>
        <div className="title_left">טון co2 פחות</div>
      </div>
      <div>
        <div className="circle_center">{props.input_center}</div>
        <div className="title_center">חברי קהילה</div>
      </div>
      <div>
        <div className="circle_right">{props.input_right}</div>
        <div className="title_right">עצים נטועים</div>
      </div>
    </div>
  );
};

export default InputCircle;
