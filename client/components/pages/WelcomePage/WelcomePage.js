import React from "react";
import Title from "react-bulma-companion/lib/Title";
import Button from "react-bulma-companion/lib/Button";
import logo from "../WelcomePage/logo.png";
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className="welcome-page">
      <div className="top">
        <img src={logo} id="open-pic" />
        <Title id="website-title">יער האקלים</Title>
        <h2 id="sub-title">שותלים עצים, מפריחים ערים</h2>
        <Link to="/login">
          <Button id="btn-login">התחברות</Button>
        </Link>
        <Link to="/register" id="sign-in">
          הרשמה
        </Link>
      </div>
      <Title id="welcome-website-title" size="4">
        ברוכים הבאים ליער האקלים
      </Title>
      <p id="paragraph">
        פרויקט לנטיעת עצים אחראית ואקולוגית במרחב האורבני המחולל שינוי אמיתי
        בשיפור איכות החיים בערים ובישובים בישראל.
        <br />
        <br />
        עצים הם מהאוצרות הגדולים שהטבע העניק לנו. התרומה שלהם לקיום שלנו פה
        חשובה לעין שיעור ממהלכים רבים שאנו עושים - בכוחם לתרום למאבק במשבר
        האקלים וההתחממות הגלובאלית, לשפר את איכות חיינו ואת בריאותנו הפיזית
        והנפשית. אנחנו מגוייסים כל כולנו למען מטרה חשובה זו.
        <br />
        עכשיו תורכם.
      </p>
      <a href="https://www.goodforest.org/" target="_blank">
        <Button id="btn-website-organization">לאתר העמותה</Button>
      </a>
    </div>
  );
}
