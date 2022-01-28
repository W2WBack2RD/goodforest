import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { push } from "connected-react-router";
// import R from "ramda";
// import request from "superagent";
// import Section from "react-bulma-companion/lib/Section";
// import Container from "react-bulma-companion/lib/Container";
import Title from "react-bulma-companion/lib/Title";
import Button from "react-bulma-companion/lib/Button";

export default function WelcomePage() {
  // const dispatch = useDispatch();
  // const { user } = useSelector(R.pick(["user"]));
  // const [response, setResponse] = React.useState("");
  // useEffect(() => {
  //   if (!R.isEmpty(user)) {
  //     dispatch(push("/home"));
  //   }
  // }, []);

  // const handleAddTodo = () => {
  //   request
  //     .get("/api/example/")
  //     .send()
  //     .then((result) => {
  //       console.log(result.body.message);
  //       setResponse(result.body.message);
  //     })
  //     .catch();
  // };

  return (
    <div className="welcome-page page">
      <div className="top">
        <img id="open-pic"></img>
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
