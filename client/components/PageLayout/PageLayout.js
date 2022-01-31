import React from 'react';
import { container } from 'webpack';
import 'client/styles/components.scss'

export default function PageLayout(props) {

  const openMenu = () => {
    console.log("menu should open");
  }
  return (

    <container className="layoutBG">
      <img id='menuIcon' onClick='openMenu' />
      <img id='treesIcon' />

      <p id='pageTitle'>
        {props.pageTitle}
      </p>

    </container>

  );
}
