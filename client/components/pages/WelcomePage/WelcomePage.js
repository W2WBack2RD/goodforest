import React from "react";
import Title from "react-bulma-companion/lib/Title";
import Button from "react-bulma-companion/lib/Button";

export default function WelcomePage() {
  return (
    <div className="welcome-page page">
      <div className="top">
        <div id="open-pic"></div>
        <Title id="website-title">יער האקלים</Title>
        <h2 id="sub-title">שותלים עצים, מפריחים ערים</h2>
        <Button id="btn-login">התחברות</Button>
        <a id="sign-in" href="#">
          הרשמה
        </a>
      </div>
      <Title id="welcome" size="4">
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
      <Button id="btn-website-organization">לאתר העמותה</Button>
    </div>
  );
}
