import React, { useEffect, useState } from "react";
import { getTodos } from "../../../api/todos";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import Section from "react-bulma-companion/lib/Section";
import Container from "react-bulma-companion/lib/Container";
import Title from "react-bulma-companion/lib/Title";
import InputCircle from "../../atoms/InputCircle";
import ArrowInput from "../../atoms/ArrowInput";
import EventBoard from "../../molecules/EventsBoard/EventsBoard";
import Button from "../../atoms/Button/Button";
import PageLayout from "../../organisms/PageLayout";
import Gallery from "../../molecules/Gallery/Gallery";
import { Link } from "react-router-dom";

const HomePage = () => {
  HomePage.treeImg = false;
  HomePage.title = "חורשה 80";
  const [inputLeft, setInputLeft] = useState("0.8");
  const [inputCenter, setInputCenter] = useState("12");
  const [inputRight, setInputRight] = useState("205");

  const [nameLeft, setNameLeft] = useState("מידע נוסף");
  const [nameCenter, setNameCenter] = useState("שיתוף חברים");
  const [nameRight, setNameRight] = useState("ספרו לי עוד");

  const handleRightClick = (e) => {};
  const handleCenterClick = (e) => {};
  const handleLeftClick = (e) => {};

  return (
    <PageLayout
      className="homePage"
      treeeIcon={false}
      innerPage={false}
      titleStyle={false}
      title="חורשת פארק 80"
    >
      <InputCircle
        className="inputCircle"
        inputLeft={inputLeft}
        inputCenter={inputCenter}
        inputRight={inputRight}
      />
      <ArrowInput
        nameLeft={nameLeft}
        nameCenter={nameCenter}
        nameRight={nameRight}
        functionR={handleRightClick}
        functionL={handleLeftClick}
        functionC={handleCenterClick}
      />
      <EventBoard />
      <div className="buttons">
        <Link to="/faultReporting">
          <Button className="reportBtn" value="דווח על תקלה" />
        </Link>
        <Link to="/reportTree">
          <Button className="reportBtn" value="עדכון סטטוס עץ" />
        </Link>
      </div>
      <Gallery className="imgGallery" />
    </PageLayout>
  );
};

export default HomePage;
