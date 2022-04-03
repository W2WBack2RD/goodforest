import React, { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { push } from "connected-react-router";
//import R from "ramda";

import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import { getAllForests } from "../../../api/forest";
import { getAllUser } from "../../../api/user";
import Section from "react-bulma-companion/lib/Section";
import Container from "react-bulma-companion/lib/Container";
import Title from "react-bulma-companion/lib/Title";
import InputCircle from "../../atoms/InputCircle";
import ArrowInput from "../../atoms/ArrowInput";
import EventBoard from "../../molecules/EventsBoard/EventsBoard";
import Button from "../../atoms/Button/Button";
import PageLayout from "../../organisms/PageLayout";
import Gallery from "../../molecules/Gallery/Gallery";
import { request } from "_api/request";
import { Link } from "react-router-dom";

const HomePage = () => {
  //HomePage.treeImg = false;
  //HomePage.title = "חורשה 80";
  const [forestResponse, setForestResponse] = React.useState("");
  const [responseData, setResponseData] = React.useState([]);

  const [userResponse, setUserResponse] = React.useState("");
  const [userResponseData, setUserResponseData] = React.useState([]);

  const [arrowData, setArrowData] = useState("");
  const [open, setOpen] = useState(false);
  const [nameLeft, setNameLeft] = useState("מידע נוסף");
  const [nameCenter, setNameCenter] = useState("שיתוף חברים");
  const [nameRight, setNameRight] = useState("ספרו לי עוד");

  const handleRightClick = (e) => {
    setOpen(!open);
    setArrowData("bla bla");
  };
  const handleCenterClick = (e) => {
    setOpen(!open);
    setArrowData("bla bla 2");
  };
  const handleLeftClick = (e) => {
    setOpen(!open);
    setArrowData("bla bla 3");
  };

  useEffect(() => {
    getAllForests();
    getAllUsers();
  }, []);

  const getAllForests = () => {
    request
      .get("/api/forest/")
      .send()
      .then((result) => {
        console.log("------------------------------------------");
        setResponseData(result.body.forests[0]);
        setForestResponse(result.body.message);
        console.log(responseData);
      })
      .catch();
  };

  const getAllUsers = () => {
    request
      .get("/api/user/")
      .send()
      .then((result) => {
        setUserResponseData(result.body.user);
        setUserResponse(result.body.message);
        console.log(userResponse);
        console.log(userResponseData);
        // console.log(userResponseData.length);
      })
      .catch();
  };
  return (
    <PageLayout
      className="homePage"
      treeeIcon={false}
      innerPage={false}
      titleStyle={false}
      title={responseData.forest_name}
    >
      <InputCircle
        className="inputCircle"
        inputLeft={responseData.trees ? responseData.trees.length * 0.896 : 0}
        inputCenter={userResponseData ? userResponseData.length : 0}
        inputRight={responseData.trees ? responseData.trees.length : 0}
      />
      <ArrowInput
        nameLeft={nameLeft}
        nameCenter={nameCenter}
        nameRight={nameRight}
        functionR={handleRightClick}
        functionL={handleCenterClick}
        functionC={handleLeftClick}
        open={open}
        data={arrowData}
        setOpen={setOpen}
      />
      <EventBoard />;
      <div className="buttons">
        <Button className="reportBtn" value="דווח על תקלה" />
        <Link to="/reportTree">
          <Button className="reportBtn" value="עדכון סטטוס עץ" />
        </Link>
      </div>
      <Gallery className="imgGallery" />
    </PageLayout>
  );
};

export default HomePage;
