import React from "react";
const InputCircle = (props) => {
  return (
    <div className="inputCircle">
      <div className="circleWrap">
        <div className="circle_left">{props.inputLeft}</div>
        <div className="title_left">פחות co2 טון</div>
      </div>
      <div className="circleWrap">
        <div className="circle_center">{props.inputCenter}</div>
        <div className="title_center">חברי קהילה</div>
      </div>
      <div className="circleWrap">
        <div className="circle_right">{props.inputRight}</div>
        <div className="title_right">עצים נטועים</div>
      </div>
    </div>
  );
};

export default InputCircle;
