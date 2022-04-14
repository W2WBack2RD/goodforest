import React, { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { push } from "connected-react-router";
//import R from "ramda";

import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import { getAllForests } from "../../../api/forest";
import { getUser } from "../../../api/user";
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
  const { user } = useSelector(R.pick(["user"]));
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
      .get("/api/forest/" + user.forest)
      .send()
      .then((result) => {
        setResponseData({ ...result.body.forest, usersCount: result.body.usersCount });
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
      })
      .catch();
  };
  console.log(responseData);
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
        inputCenter={responseData.usersCount ? responseData.usersCount : 0}
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
      <EventBoard />
      <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
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
