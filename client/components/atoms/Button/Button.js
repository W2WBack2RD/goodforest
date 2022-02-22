import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = (props) => {
  return (
    <div>
      <button className="greenButton">
        <text className="textInBtn">{props.value}</text>
      </button>
    </div>
  );
};

export default Button;
