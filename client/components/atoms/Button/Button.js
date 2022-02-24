import React from "react";

const Button = (props) => {
  return (
    <div>
      <button className="greenButton">
        <p className="textInBtn">{props.value}</p>
      </button>
    </div>
  );
};

export default Button;
